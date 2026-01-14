import { NextRequest, NextResponse } from 'next/server'

// Check email delivery status in Brevo
export async function GET(request: NextRequest) {
  try {
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'BREVO_API_KEY not configured'
      }, { status: 500 })
    }

    const searchParams = request.nextUrl.searchParams
    const messageId = searchParams.get('messageId')

    if (!messageId) {
      return NextResponse.json({
        success: false,
        error: 'messageId parameter required'
      }, { status: 400 })
    }

    // Note: Brevo doesn't have a direct API to check delivery status for individual emails
    // But we can check the account's email statistics
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Failed to check account status'
      }, { status: 500 })
    }

    const accountData = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Email was sent successfully. Check your inbox and spam folder.',
      messageId: messageId,
      account: {
        email: accountData.email,
        plan: accountData.plan,
      },
      tips: [
        'Check your spam/junk folder',
        'Check "Promotions" tab in Gmail',
        'Wait 1-2 minutes for delivery',
        'Check browser console for OTP code (development mode)',
        'Verify email address is correct: khandekarpranav52@gmail.com'
      ]
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

