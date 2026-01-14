import { NextRequest, NextResponse } from 'next/server'

// Simple test endpoint to debug email sending
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const testEmail = email || process.env.ADMIN_EMAIL || 'khandekarpranav52@gmail.com'
    
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'BREVO_API_KEY is not set',
        apiKeyExists: false
      }, { status: 500 })
    }

    console.log('🧪 Testing email send to:', testEmail)
    console.log('🧪 API Key exists:', !!process.env.BREVO_API_KEY)
    console.log('🧪 API Key length:', process.env.BREVO_API_KEY?.length)

    const emailPayload = {
      sender: { 
        name: 'Blog Admin Test', 
        email: 'pranavkhandekar152@gmail.com' 
      },
      to: [{ email: testEmail, name: 'Test User' }],
      subject: 'Test Email - Admin Login',
      htmlContent: '<p>This is a test email. If you receive this, your email service is working!</p>',
      textContent: 'This is a test email. If you receive this, your email service is working!'
    }

    console.log('🧪 Sending test email with payload:', JSON.stringify(emailPayload, null, 2))

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    const responseText = await response.text()
    console.log('🧪 Response status:', response.status)
    console.log('🧪 Response text:', responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch (e) {
        errorData = { message: responseText }
      }

      return NextResponse.json({
        success: false,
        error: 'Failed to send test email',
        status: response.status,
        statusText: response.statusText,
        errorDetails: errorData,
        apiKeyExists: true
      }, { status: 500 })
    }

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      responseData = { message: responseText }
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      response: responseData,
      apiKeyExists: true
    })
  } catch (error: any) {
    console.error('🧪 Test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Error during test',
      details: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}

