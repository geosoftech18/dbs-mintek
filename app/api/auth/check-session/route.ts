import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/auth-store'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    console.log('Check session - cookie exists:', !!session)
    if (session) {
      console.log('Check session - verifying token:', session.value.substring(0, 20) + '...')
      const isValid = verifySession(session.value)
      console.log('Check session - token valid:', isValid)
      
      if (isValid) {
        return NextResponse.json(
          { 
            success: true, 
            authenticated: true,
            message: 'Session valid' 
          },
          { status: 200 }
        )
      }
    }

    // Return 200 with authenticated: false (401 is expected when not logged in)
    console.log('Check session - no valid session found')
    return NextResponse.json(
      { 
        success: true, 
        authenticated: false,
        message: 'No valid session' 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Check session error:', error)
    return NextResponse.json(
      { 
        success: false, 
        authenticated: false,
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

