# Quick Email Fix Guide

## Immediate Steps to Diagnose

### Step 1: Check Server Logs
When you click "Send Verification Code", check your terminal where `npm run dev` is running. Look for:
- `📧 Attempting to send OTP email to: ...`
- `📧 Brevo API response status: ...`
- `✅ Email sent successfully!` OR `❌ Brevo API error details: ...`

### Step 2: Use Diagnostic Page
Visit: **http://localhost:3000/blog/admin/email-test**

This page will:
1. Test your Brevo API configuration
2. Send a test email
3. Show detailed error messages

### Step 3: Check Common Issues

#### Issue 1: Sender Email Not Verified
**Error:** "Sender email not verified" or HTTP 400/403
**Fix:**
1. Go to: https://app.brevo.com/settings/senders
2. Add `khandekarpranav52@gmail.com` as a sender
3. Verify the email (check your inbox for verification email)
4. Wait for verification to complete

#### Issue 2: IP Address Not Authorized
**Error:** "IP address not authorized" or HTTP 403
**Fix:**
1. Go to: https://app.brevo.com/security/authorised_ips
2. Click "Add an IP address"
3. Enter your current IP (or use `0.0.0.0/0` for testing - allows all IPs)
4. Save

#### Issue 3: Invalid API Key
**Error:** HTTP 401 Unauthorized
**Fix:**
1. Go to: https://app.brevo.com/settings/keys/api
2. Create a new API key
3. Copy the full key (starts with `xkeysib-`)
4. Update `.env.local`:
   ```
   BREVO_API_KEY=xkeysib-your-full-key-here
   ```
5. Restart your dev server

#### Issue 4: Email Going to Spam
**Symptoms:** Email sent successfully but not received
**Fix:**
1. Check spam/junk folder
2. Check "Promotions" tab in Gmail
3. Add sender to contacts
4. Wait 1-2 minutes (sometimes there's a delay)

#### Issue 5: Free Tier Limitations
**Symptoms:** Works sometimes but fails randomly
**Fix:**
- Brevo free tier has limits (300 emails/day)
- Check your usage: https://app.brevo.com/account/usage
- Upgrade if needed

## Quick Test Commands

### Test API Configuration
```bash
# In browser, visit:
http://localhost:3000/api/auth/test-email
```

### Test Email Sending
```bash
# In browser, visit:
http://localhost:3000/blog/admin/email-test
```

## What to Check in Server Logs

When sending OTP, you should see:
```
📧 Attempting to send OTP email to: khandekarpranav52@gmail.com
📧 OTP generated: 1234
📧 Brevo API response status: 200 OK
✅ Email sent successfully! Response: { messageId: '...' }
```

If you see errors:
```
❌ Brevo API error details: { status: 401, error: {...} }
```

Copy the error details and check the fixes above.

## Temporary Workaround

While fixing email issues, you can use the console OTP:
1. Open browser console (F12)
2. Click "Send Verification Code"
3. Look for: `🔐 Development OTP: XXXX`
4. Use that code to login

## Still Not Working?

1. **Check Brevo Dashboard:**
   - Go to: https://app.brevo.com/settings/keys/api
   - Verify API key is active
   - Check account status

2. **Check Email Logs in Brevo:**
   - Go to: https://app.brevo.com/statistics/email
   - See if emails are being sent
   - Check for bounces or failures

3. **Verify Environment Variables:**
   - Make sure `.env.local` has `BREVO_API_KEY`
   - Restart dev server after changes
   - No spaces or quotes around the key

4. **Test with Different Email:**
   - Try sending to a different email address
   - Some email providers block transactional emails

