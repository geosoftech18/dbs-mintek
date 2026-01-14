import { NextResponse } from 'next/server'

// Test endpoint to check Brevo API configuration
export async function GET() {
  try {
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'BREVO_API_KEY is not set in environment variables',
        configured: false
      }, { status: 500 })
    }

    // Test API key by making a simple request
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({
        success: false,
        error: 'Brevo API key validation failed',
        status: response.status,
        details: errorData,
        configured: true,
        valid: false
      }, { status: 500 })
    }

    const accountData = await response.json()

    return NextResponse.json({
      success: true,
      configured: true,
      valid: true,
      account: {
        email: accountData.email,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
      },
      message: 'Brevo API is properly configured'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Error testing Brevo API',
      details: error.message,
      configured: !!process.env.BREVO_API_KEY
    }, { status: 500 })
  }
}

