import { NextRequest, NextResponse } from 'next/server'
import { sendBrevoEmail } from '@/lib/brevo'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'khandekarpranav52@gmail.com'
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'pranavkhandekar152@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not set in environment variables')
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please contact administrator.' },
        { status: 500 }
      )
    }

    const submittedAt = new Date().toLocaleString()

    const ownerHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #2563eb; margin-bottom: 5px; display: block; }
            .value { color: #333; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #2563eb; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📞 New Callback Request</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Full Name:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">📞 Phone:</span>
                <div class="value">${phone}</div>
              </div>
            </div>
            <div class="footer">
              <p>Submitted via the city page callback request dialog.</p>
              <p>Submitted at: ${submittedAt}</p>
            </div>
          </div>
        </body>
      </html>
    `

    const ownerText = `
New Callback Request

Full Name: ${name}
Email: ${email}
Phone: ${phone}

---
Submitted at: ${submittedAt}
Submitted via the city page callback request dialog.
    `.trim()

    console.log('📧 Sending callback inquiry to:', ADMIN_EMAIL)

    await sendBrevoEmail({
      sender: { name: 'DBS Mintek Callback Form', email: SENDER_EMAIL },
      to: [{ email: ADMIN_EMAIL, name: 'Admin' }],
      replyTo: { email, name },
      subject: `New Callback Request from ${name}`,
      htmlContent: ownerHtml,
      textContent: ownerText,
    })

    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
            </div>
            <div class="content">
              <p>We have received your <strong>callback request</strong> with DBS Mintek.</p>
              <div class="highlight">
                <p style="margin: 0 0 8px 0;"><strong>What happens next?</strong></p>
                <p style="margin: 0;">Our team will call you at <strong>${phone}</strong> within <strong>2 business hours</strong>.</p>
              </div>
              <p>If you need to update your details, reply to this email.</p>
            </div>
            <div class="footer">
              <p>DBS Mintek · Mumbai Operations Centre</p>
              <p>This is an automated confirmation. Please do not share sensitive credentials over email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const confirmationText = `
Thank You, ${name}!

We have received your callback request with DBS Mintek.

What happens next?
Our team will call you at ${phone} within 2 business hours.

If you need to update your details, reply to this email.

---
DBS Mintek
This is an automated confirmation.
    `.trim()

    console.log('📧 Sending callback confirmation to:', email)

    await sendBrevoEmail({
      sender: { name: 'DBS Mintek', email: SENDER_EMAIL },
      to: [{ email, name }],
      subject: 'We received your callback request - DBS Mintek',
      htmlContent: confirmationHtml,
      textContent: confirmationText,
    })

    console.log('✅ Callback emails sent successfully')

    return NextResponse.json(
      { success: true, message: 'Your callback request has been submitted successfully!' },
      { status: 200 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error'
    console.error('Error sending callback emails:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email. Please try again later.', details: message },
      { status: 500 }
    )
  }
}
