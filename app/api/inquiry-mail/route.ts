import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'khandekarpranav52@gmail.com'
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'pranavkhandekar152@gmail.com'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, phone, email, companyName, signature, enquiryType } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !companyName || !enquiryType) {
      return NextResponse.json(
        { success: false, error: 'First name, last name, email, phone, company name, and enquiry type are required' },
        { status: 400 }
      )
    }

    // Check if BREVO_API_KEY is set
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not set in environment variables')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured. Please contact administrator.' 
        },
        { status: 500 }
      )
    }

    // Create full name
    const fullName = `${firstName} ${lastName}`

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #667eea; margin-bottom: 5px; display: block; }
            .value { color: #333; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #667eea; }
            .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #764ba2; margin-top: 10px; }
            .enquiry-badge { display: inline-block; background: #667eea; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Full Name:</span>
                <div class="value">${fullName}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <span class="label">📞 Phone:</span>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <span class="label">🏢 Company Name:</span>
                <div class="value">${companyName}</div>
              </div>
              
              <div class="field">
                <span class="label">🎯 Type of Enquiry:</span>
                <div class="value">
                  <span class="enquiry-badge">${enquiryType}</span>
                </div>
              </div>
              
              ${signature ? `
              <div class="field">
                <span class="label">💬 Message / Additional Information:</span>
                <div class="message-box">${signature.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This inquiry was submitted through the DBS Mintek contact form.</p>
              <p>Submitted at: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Create plain text version
    const textContent = `
New Contact Form Inquiry

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Company Name: ${companyName}
Type of Enquiry: ${enquiryType}
${signature ? `\nMessage / Additional Information:\n${signature}` : ''}

---
Submitted at: ${new Date().toLocaleString()}
This inquiry was submitted through the DBS Mintek contact form.
    `.trim()

    console.log('📧 Sending contact form inquiry to:', ADMIN_EMAIL)

    // Send email via Brevo
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { 
          name: 'DBS Mintek Contact Form', 
          email: SENDER_EMAIL 
        },
        to: [{ email: ADMIN_EMAIL, name: 'Admin' }],
        replyTo: { email: email, name: fullName },
        subject: `New Contact Form Inquiry from ${fullName}${companyName ? ` - ${companyName}` : ''} - ${enquiryType}`,
        htmlContent: htmlContent,
        textContent: textContent,
      }),
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
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send email. Please try again later.',
          details: errorData.message
        },
        { status: 500 }
      )
    }

    const responseData = await response.json().catch(() => ({}))
    console.log('✅ Contact form email sent successfully! Response:', responseData)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your enquiry has been submitted successfully!' 
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error sending contact form email:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later.',
        details: error.message || 'Internal server error'
      },
      { status: 500 }
    )
  }
}

