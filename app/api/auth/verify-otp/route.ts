import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { otpStore, createSession } from '@/lib/auth-store'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'khandekarpranav52@gmail.com'

export async function POST(request: NextRequest) {
  try {
    let requestBody
    try {
      requestBody = await request.json()
    } catch (error) {
      console.error('❌ Error parsing request body:', error)
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { email, otp } = requestBody

    console.log('🔐 Verify OTP request:', { email, otp: otp ? '****' : 'missing', otpLength: otp?.length })

    // Validate input
    if (!email || !otp) {
      console.error('❌ Missing email or OTP:', { email: !!email, otp: !!otp })
      return NextResponse.json(
        { success: false, error: 'Email and OTP are required' },
        { status: 400 }
      )
    }

    // Verify email is admin email
    if (email !== ADMIN_EMAIL) {
      console.error('❌ Unauthorized email:', email)
      return NextResponse.json(
        { success: false, error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Get stored OTP
    const storedData = otpStore.get(email)
    console.log('🔍 Stored OTP data:', storedData ? { code: '****', expiresAt: storedData.expiresAt } : 'not found')
    console.log('🔍 Current time:', Date.now())
    console.log('🔍 OTP store keys:', Array.from(otpStore.keys()))

    if (!storedData) {
      console.error('❌ No OTP found for email:', email)
      return NextResponse.json(
        { success: false, error: 'No verification code found. Please request a new code.' },
        { status: 400 }
      )
    }

    // Check if OTP expired
    if (Date.now() > storedData.expiresAt) {
      console.error('❌ OTP expired:', { now: Date.now(), expiresAt: storedData.expiresAt })
      otpStore.delete(email)
      return NextResponse.json(
        { success: false, error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      )
    }

    // Verify OTP
    console.log('🔍 Comparing OTP:', { stored: storedData.code, received: otp, match: storedData.code === otp })
    if (storedData.code !== otp) {
      console.error('❌ OTP mismatch')
      return NextResponse.json(
        { success: false, error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // OTP is valid - create session
    const sessionToken = createSession(email)
    console.log('✅ Session created:', sessionToken.substring(0, 20) + '...')

    // Store session in cookie
    const cookieStore = await cookies()
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        token: sessionToken 
      },
      { status: 200 }
    )

    // Set cookie in response
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    console.log('✅ Cookie set in response')

    // Delete used OTP
    otpStore.delete(email)

    return response
  } catch (error: any) {
    console.error('Error in verify-otp:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

