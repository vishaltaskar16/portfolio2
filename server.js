import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to send emails:', success);
  }
});

// Email sending route
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, message',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  try {
    // Email to you (portfolio owner)
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL || 'vishaltaskar1602@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Message from Your Portfolio
          </h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
            <p style="margin: 10px 0;">
              <strong style="color: #1e293b;">Name:</strong>
              <span style="color: #475569;">${escapeHtml(name)}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #1e293b;">Email:</strong>
              <a href="mailto:${escapeHtml(email)}" style="color: #3b82f6; text-decoration: none;">
                ${escapeHtml(email)}
              </a>
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1e293b; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; line-height: 1.6; color: #475569;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Received on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to the visitor
    const confirmationEmail = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: email,
      subject: 'We received your message!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b;">Thank you for reaching out!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Hi ${escapeHtml(name)},
          </p>
          <p style="color: #475569; line-height: 1.6;">
            We have received your message and will get back to you as soon as possible. 
            We appreciate your interest and look forward to connecting with you!
          </p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; color: #475569;">
            <p><strong>Your message summary:</strong></p>
            <p style="margin: 5px 0;">Message length: ${message.length} characters</p>
          </div>
          <p style="margin-top: 30px; color: #94a3b8; font-size: 12px;">
            Best regards,<br>
            Vishal Taskar
          </p>
        </div>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Utility function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
