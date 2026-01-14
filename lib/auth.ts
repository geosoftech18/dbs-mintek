import { cookies } from 'next/headers'
import { verifySession } from './auth-store'

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    
    if (!session) return false
    
    return verifySession(session.value)
  } catch (error) {
    return false
  }
}

