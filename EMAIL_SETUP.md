# Email Setup Guide for Contact Form

## Backend Setup with SMTP

### Prerequisites
- Node.js installed on your system
- Gmail account or any SMTP server credentials

### Step 1: Create `.env` File

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your SMTP credentials:

```env
# For Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM_EMAIL=your-email@gmail.com
RECIPIENT_EMAIL=vishaltaskar1602@gmail.com

# Server
PORT=5000
NODE_ENV=development
```

### Step 2: Get Gmail App Password

1. Enable 2-Step Verification on your Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the generated 16-character password
5. Paste it as `SMTP_PASS` in your `.env` file

### Step 3: Install Dependencies

```bash
npm install
```

This will install both frontend and backend dependencies:
- `express` - Web server framework
- `nodemailer` - Email sending library
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Step 4: Run the Application

**Option A: Run frontend and backend separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

**Option B: Run both concurrently**
```bash
npm run dev:all
```

### Step 5: Test the Contact Form

1. Open your portfolio at `http://localhost:5173` (or your Vite dev port)
2. Scroll to the Contact section
3. Fill in the form with test data
4. Click "Send Message"
5. Check your email for the message

### Features Implemented

✅ **SMTP Email Sending** - Uses Node.js/Express backend
✅ **Formatted Emails** - Beautiful HTML email templates
✅ **Form Validation** - Input validation and error handling
✅ **Loading States** - Visual feedback while sending
✅ **Success/Error Messages** - User-friendly notifications
✅ **Confirmation Email** - Auto-reply to sender
✅ **HTML Email Templates** - Professional formatting with sender info

### Email Flow

1. **User submits form** → Frontend sends POST request to `/api/send-email`
2. **Backend validation** → Checks for required fields and valid email format
3. **Email to you** → Receives full message with sender's contact info
4. **Confirmation email** → Sender gets acknowledgment
5. **Success response** → Frontend shows success message

### Troubleshooting

**"SMTP Connection Error"**
- Verify SMTP credentials are correct
- For Gmail, use an [App Password](https://myaccount.google.com/apppasswords), not your regular password
- Ensure 2-Step Verification is enabled on Gmail

**"Network error" on form submit**
- Make sure backend server is running (`npm run server`)
- Check that backend is on the correct port (default: 5000)
- Verify `VITE_API_URL` environment variable if needed

**Port 5000 already in use**
- Change `PORT` in `.env` to an available port
- Or kill the process using port 5000

### Environment Variables for Production

When deploying:
- Set `VITE_API_URL` to your backend URL
- Use production SMTP credentials
- Set `NODE_ENV=production`
- Use environment variables from your hosting provider (Heroku, Vercel, etc.)

### Using Different SMTP Providers

**Gmail:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

**Outlook:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

**SendGrid:**
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**AWS SES:**
```
SMTP_HOST=email-smtp.region.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
```

For more details, check the [Nodemailer Documentation](https://nodemailer.com/).
