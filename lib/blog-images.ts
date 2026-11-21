/** True when the image is a remote URL (safe for OG/ISR). */
export function isRemoteImageUrl(src: string | null | undefined): boolean {
  if (!src) return false
  return /^https?:\/\//i.test(src)
}

/** Drop base64 data-URI images from props so RSC/ISR payloads stay small. */
export function slimImageSrc(src: string | null | undefined): string | null {
  if (!src) return null
  return isRemoteImageUrl(src) ? src : null
}

/**
 * Compress a data-URI or return remote URLs unchanged.
 * Used when saving posts so Mongo + ISR pages stay under Vercel limits.
 */
export async function compressDataUriImage(
  input: string | null | undefined,
  opts: { maxWidth?: number; quality?: number } = {}
): Promise<string | null> {
  if (!input) return null
  if (isRemoteImageUrl(input)) return input
  if (!input.startsWith('data:image/')) return input

  const { maxWidth = 1400, quality = 70 } = opts

  try {
    const sharp = (await import('sharp')).default
    const match = input.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
    if (!match) return input

    const buffer = Buffer.from(match[2], 'base64')
    // Already small enough — keep as-is.
    if (buffer.length < 180_000) return input

    const out = await sharp(buffer)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer()

    return `data:image/jpeg;base64,${out.toString('base64')}`
  } catch (error) {
    console.error('compressDataUriImage failed:', error)
    return input
  }
}

/** Compress every data-URI <img src> inside HTML content. */
export async function compressHtmlDataImages(
  html: string,
  opts?: { maxWidth?: number; quality?: number }
): Promise<string> {
  if (!html || !html.includes('data:image/')) return html

  const parts: string[] = []
  let last = 0
  const re = /(<img\b[^>]*?\bsrc=["'])(data:image\/[a-zA-Z0-9.+-]+;base64,[^"']+)(["'][^>]*>)/gi
  let match: RegExpExecArray | null

  while ((match = re.exec(html))) {
    parts.push(html.slice(last, match.index))
    const compressed = await compressDataUriImage(match[2], opts)
    parts.push(match[1] + (compressed || match[2]) + match[3])
    last = match.index + match[0].length
  }
  parts.push(html.slice(last))
  return parts.join('')
}
