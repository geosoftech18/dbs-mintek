import https from 'https'

const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'

type BrevoHttpResponse = {
  ok: boolean
  status: number
  statusText: string
  text(): Promise<string>
  json(): Promise<unknown>
}

function isTlsVerificationError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const cause = error.cause as { code?: string; message?: string } | undefined
  if (cause?.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') return true
  if (error.message.includes('unable to verify the first certificate')) return true
  if (cause?.message?.includes('unable to verify the first certificate')) return true
  return false
}

function sendViaHttps(
  body: string,
  rejectUnauthorized: boolean
): Promise<BrevoHttpResponse> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.brevo.com',
        port: 443,
        path: '/v3/smtp/email',
        method: 'POST',
        agent: new https.Agent({ rejectUnauthorized }),
        headers: {
          'api-key': process.env.BREVO_API_KEY!,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk) => chunks.push(chunk))
        res.on('end', () => {
          const data = Buffer.concat(chunks).toString('utf8')
          const status = res.statusCode ?? 500
          resolve({
            ok: status >= 200 && status < 300,
            status,
            statusText: res.statusMessage ?? '',
            text: async () => data,
            json: async () => (data ? JSON.parse(data) : {}),
          })
        })
      }
    )
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function sendViaFetch(body: string): Promise<BrevoHttpResponse> {
  const response = await fetch(BREVO_EMAIL_URL, {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
    },
    body,
  })
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    text: () => response.text(),
    json: () => response.json(),
  }
}

async function dispatchBrevoRequest(body: string): Promise<BrevoHttpResponse> {
  const skipTls =
    process.env.BREVO_SKIP_TLS_VERIFY === 'true' &&
    process.env.NODE_ENV !== 'production'

  if (skipTls) {
    return sendViaHttps(body, false)
  }

  try {
    return await sendViaFetch(body)
  } catch (error) {
    if (process.env.NODE_ENV === 'development' && isTlsVerificationError(error)) {
      console.warn(
        '[brevo] TLS verification failed in development; retrying without certificate verification'
      )
      return sendViaHttps(body, false)
    }
    throw error
  }
}

export async function sendBrevoEmail(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload)
  const response = await dispatchBrevoRequest(body)

  if (!response.ok) {
    let errorData: { message?: string }
    try {
      const responseText = await response.text()
      try {
        errorData = JSON.parse(responseText) as { message?: string }
      } catch {
        errorData = { message: responseText || `HTTP ${response.status}: ${response.statusText}` }
      }
    } catch {
      errorData = { message: `HTTP ${response.status}: ${response.statusText}` }
    }
    throw new Error(errorData.message || 'Failed to send email')
  }

  return response.json().catch(() => ({}))
}
