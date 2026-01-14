import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/auth-store'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'khandekarpranav52@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Verify email is admin email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Store OTP
    otpStore.set(email, { code: otp, expiresAt })
    console.log('💾 OTP stored:', { email, otp, expiresAt, storeSize: otpStore.size })
    console.log('💾 OTP store keys after storing:', Array.from(otpStore.keys()))

    // Check if BREVO_API_KEY is set
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not set in environment variables')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured. Please contact administrator.',
          details: 'BREVO_API_KEY is missing'
        },
        { status: 500 }
      )
    }

    // Send OTP via email using Brevo
    try {
      console.log('📧 Attempting to send OTP email to:', ADMIN_EMAIL)
      console.log('📧 OTP generated:', otp)
      
      const emailPayload = {
        sender: { 
          name: 'Blog Admin', 
          email: process.env.SENDER_EMAIL || 'pranavkhandekar152@gmail.com' 
        },
        to: [{ email: ADMIN_EMAIL, name: 'Admin' }],
        subject: 'Admin Login Verification Code',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: white; margin: 0;">Admin Login Verification</h1>
            </div>
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Your verification code is:</p>
              <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <h2 style="font-size: 32px; color: #667eea; margin: 0; letter-spacing: 5px; font-weight: bold;">${otp}</h2>
              </div>
              <p style="font-size: 14px; color: #666; margin-top: 20px;">This code will expire in 10 minutes.</p>
              <p style="font-size: 12px; color: #999; margin-top: 20px;">If you didn't request this code, please ignore this email.</p>
            </div>
          </div>
        `,
        textContent: `Admin Login Verification Code\n\nYour verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`
      }
      
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      })
      
      console.log('📧 Brevo API response status:', response.status, response.statusText)

      if (!response.ok) {
        let errorData
        try {
          const responseText = await response.text()
          console.error('📧 Brevo API error response:', responseText)
          try {
            errorData = JSON.parse(responseText)
          } catch (e) {
            errorData = { message: responseText || `HTTP ${response.status}: ${response.statusText}` }
          }
        } catch (e) {
          errorData = { message: `HTTP ${response.status}: ${response.statusText}` }
        }
        
        console.error('❌ Brevo API error details:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        
        // Check for specific error types
        if (response.status === 401 || response.status === 403) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Email service authentication failed. Please check API key configuration.',
              details: errorData.message || 'Invalid API key'
            },
            { status: 500 }
          )
        }
        
        if (errorData.code === 'unauthorized' || errorData.message?.includes('IP address')) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'IP address not authorized. Please add your IP to Brevo authorized IPs.',
              hint: 'Go to https://app.brevo.com/security/authorised_ips and add your IP address',
              details: errorData.message
            },
            { status: 500 }
          )
        }
        
        if (errorData.message?.includes('sender') || errorData.message?.includes('email')) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Sender email not verified. Please verify your email in Brevo.',
              hint: 'Go to https://app.brevo.com/settings/senders and verify your sender email',
              details: errorData.message
            },
            { status: 500 }
          )
        }
        
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to send verification email',
            details: errorData.message || `HTTP ${response.status}: ${response.statusText}`
          },
          { status: 500 }
        )
      }

      const responseData = await response.json().catch(() => ({}))
      console.log('✅ Email sent successfully! Response:', responseData)
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Verification code sent to your email',
          // In development, you might want to return the OTP for testing
          // Remove this in production!
          ...(process.env.NODE_ENV === 'development' && { otp })
        },
        { status: 200 }
      )
    } catch (error: any) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send verification email',
          details: error.message || 'Network error or service unavailable'
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error in send-otp:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check if OTP exists (for testing)
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to send OTP',
    storedOTPs: Array.from(otpStore.keys()),
  })
}

