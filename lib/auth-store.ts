// Shared store for OTPs and sessions
// In production, use Redis or database instead

interface OTPData {
  code: string
  expiresAt: number
}

interface SessionData {
  email: string
  expiresAt: number
}

// Use global to persist across module reloads in Next.js
declare global {
  var __otpStore: Map<string, OTPData> | undefined
  var __sessionStore: Map<string, SessionData> | undefined
}

export const otpStore = globalThis.__otpStore || (globalThis.__otpStore = new Map<string, OTPData>())
export const sessionStore = globalThis.__sessionStore || (globalThis.__sessionStore = new Map<string, SessionData>())

// Clean up expired OTPs and sessions
setInterval(() => {
  const now = Date.now()
  
  // Clean expired OTPs
  for (const [email, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(email)
    }
  }
  
  // Clean expired sessions
  for (const [token, data] of sessionStore.entries()) {
    if (data.expiresAt < now) {
      sessionStore.delete(token)
    }
  }
}, 5 * 60 * 1000) // Every 5 minutes

export function verifySession(token: string): boolean {
  const session = sessionStore.get(token)
  if (!session) return false
  
  if (Date.now() > session.expiresAt) {
    sessionStore.delete(token)
    return false
  }
  
  return true
}

export function createSession(email: string): string {
  const token = `admin_${Date.now()}_${Math.random().toString(36).substring(7)}`
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  
  sessionStore.set(token, { email, expiresAt })
  return token
}

export function deleteSession(token: string): void {
  sessionStore.delete(token)
}

