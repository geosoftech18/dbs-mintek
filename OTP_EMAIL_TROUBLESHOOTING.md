# OTP Email Troubleshooting Guide

## Common Issues and Solutions

### 1. **OTP Email Not Received**

#### Check 1: Verify Brevo API Key
- Visit: `http://localhost:3000/api/auth/test-email`
- This will test if your Brevo API key is valid and configured correctly

#### Check 2: Verify Sender Email
- The sender email `khandekarpranav52@gmail.com` must be verified in Brevo
- Go to: https://app.brevo.com/settings/senders
- Make sure the email is verified and active

#### Check 3: Check IP Authorization
- Brevo may require your IP address to be whitelisted
- Go to: https://app.brevo.com/security/authorised_ips
- Add your current IP address or allow all IPs (for testing)

#### Check 4: Check Spam Folder
- Sometimes emails go to spam/junk folder
- Check your spam folder for the verification code

#### Check 5: Check Console Logs
- Open browser developer console (F12)
- Look for error messages when clicking "Send Verification Code"
- Check server logs for detailed error messages

### 2. **Error Messages**

#### "Email service not configured"
- **Solution**: Make sure `BREVO_API_KEY` is set in `.env.local`
- Restart your development server after adding the key

#### "IP address not authorized"
- **Solution**: Add your IP to Brevo authorized IPs
- Go to: https://app.brevo.com/security/authorised_ips

#### "Sender email not verified"
- **Solution**: Verify your sender email in Brevo
- Go to: https://app.brevo.com/settings/senders
- Click "Verify" next to your email address

#### "Email service authentication failed"
- **Solution**: Check if your Brevo API key is correct
- Get a new API key from: https://app.brevo.com/settings/keys/api

### 3. **Development Mode**

In development mode, the OTP is also logged to the browser console:
- Open browser console (F12)
- Look for: `🔐 Development OTP: XXXX`
- You can use this code to login without checking email

### 4. **Testing the Email Service**

1. **Test API Configuration:**
   ```
   GET http://localhost:3000/api/auth/test-email
   ```

2. **Test Sending OTP:**
   - Go to: http://localhost:3000/blog/admin/login
   - Enter admin email: `khandekarpranav52@gmail.com`
   - Click "Send Verification Code"
   - Check console for errors or OTP (in dev mode)

### 5. **Environment Variables Required**

Make sure these are set in `.env.local`:
```env
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=khandekarpranav52@gmail.com
```

### 6. **Brevo Account Setup**

1. **Create Brevo Account**: https://www.brevo.com/
2. **Get API Key**: 
   - Go to: https://app.brevo.com/settings/keys/api
   - Create a new API key
   - Copy and add to `.env.local`
3. **Verify Sender Email**:
   - Go to: https://app.brevo.com/settings/senders
   - Add and verify `khandekarpranav52@gmail.com`
4. **Configure IP Access** (if needed):
   - Go to: https://app.brevo.com/security/authorised_ips
   - Add your IP or allow all IPs for testing

### 7. **Common Brevo API Errors**

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 401 | Unauthorized | Check API key |
| 403 | Forbidden | Check IP whitelist or sender verification |
| 400 | Bad Request | Check email format or sender email |
| 429 | Rate Limit | Too many requests, wait a few minutes |

### 8. **Quick Fix Checklist**

- [ ] `BREVO_API_KEY` is set in `.env.local`
- [ ] Development server restarted after adding API key
- [ ] Sender email is verified in Brevo
- [ ] IP address is whitelisted (if required)
- [ ] Checked spam folder
- [ ] Checked browser console for errors
- [ ] Checked server logs for detailed errors

### 9. **Alternative: Use Console OTP (Development Only)**

If emails are not working, you can temporarily use the console OTP:
1. Open browser console (F12)
2. Click "Send Verification Code"
3. Look for: `🔐 Development OTP: XXXX`
4. Use that code to login

**Note**: This only works in development mode (`NODE_ENV=development`)

