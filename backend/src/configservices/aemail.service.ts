import nodemailer from 'nodemailer';
import { formatCurrency, formatDate } from '../utils/helper';


const smtpPort = Number.parseInt(process.env.SMTP_PORT || '587');
// port 465 = implicit SSL (secure:true), port 587 = STARTTLS (secure:false + requireTLS)
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpSecure,
  requireTLS: !smtpSecure,   // force STARTTLS upgrade for port 587
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },  // avoid cert issues on some hosts
});

const platform = process.env.PLATFORM_NAME || 'CourseHub';
const origin   = process.env.ORIGIN || 'http://localhost:5173';

async function sendMail(to: string, subject: string, html: string): Promise<void> {
  try {
    await transporter.sendMail({ from: `"${platform}" <${process.env.SMTP_USER}>`, to, subject, html });
  } catch (e) {
    console.error('[Email] sendMail error:', e);
  }
}

function baseTemplate(content: string): string {
  return `
  <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">${platform}</h1>
    </div>
    <div style="padding:40px;">${content}</div>
    <div style="background:#f9fafb;padding:20px 40px;text-align:center;color:#9ca3af;font-size:13px;">
      &copy; ${new Date().getFullYear()} ${platform}. All rights reserved.
    </div>
  </div>`;
}

export const emailService = {
  async sendOtp(email: string, otp: string): Promise<void> {
    await sendMail(email, `Verify your account — ${platform}`,
      baseTemplate(`
        <h2 style="color:#1f2937;margin-top:0;">Email Verification</h2>
        <p style="color:#4b5563;">Your OTP for email verification is:</p>
        <div style="background:#f3f4f6;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
          <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#6366f1;">${otp}</span>
        </div>
        <p style="color:#6b7280;font-size:14px;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
      `)
    );
  },

  async sendPasswordReset(email: string, otp: string): Promise<void> {
    await sendMail(email, `Reset your password — ${platform}`,
      baseTemplate(`
        <h2 style="color:#1f2937;margin-top:0;">Password Reset</h2>
        <p style="color:#4b5563;">Your password reset OTP is:</p>
        <div style="background:#fef3c7;border-radius:8px;padding:20px;text-align:center;margin:24px 0;">
          <span style="font-size:36px;font-weight:700;letter-spacing:8px;color:#d97706;">${otp}</span>
        </div>
        <p style="color:#6b7280;font-size:14px;">Valid for <strong>10 minutes</strong>. If you did not request this, ignore this email.</p>
      `)
    );
  },

  async sendOrderConfirmation(opts: {
    email: string; username: string; courseName: string;
    amount: number; currency: string; gateway: string;
    transactionId?: string; purchasedAt: Date; courseId: string;
  }): Promise<void> {
    const formattedAmount = formatCurrency(opts.amount, opts.currency);
    const formattedDate   = formatDate(opts.purchasedAt);
    const accessLink      = `${origin}/courses/${opts.courseId}/learn`;

    await sendMail(opts.email, `🎉 You're enrolled in: ${opts.courseName}`,
      baseTemplate(`
        <!-- Hero -->
        <div style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:12px;padding:32px 24px;text-align:center;margin-bottom:28px;">
          <p style="font-size:40px;margin:0 0 8px 0;">🎉</p>
          <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0 0 8px 0;">You're in! Enjoy your course</h1>
          <p style="color:#e0e7ff;font-size:15px;margin:0;">${opts.courseName}</p>
        </div>

        <p style="color:#374151;font-size:15px;">Hi <strong>${opts.username}</strong>,</p>
        <p style="color:#4b5563;font-size:14px;line-height:1.6;">Your payment was successful and you now have <strong>lifetime access</strong> to the course. Start learning right away!</p>

        <!-- CTA -->
        <div style="text-align:center;margin:28px 0;">
          <a href="${accessLink}" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;">▶ Start Learning Now</a>
        </div>

        <!-- Order details -->
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin:24px 0;">
          <div style="background:#e0e7ff;padding:12px 20px;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#4338ca;text-transform:uppercase;letter-spacing:0.05em;">Order Summary</p>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:12px 20px;color:#6b7280;font-size:13px;width:40%;">Course</td>
              <td style="padding:12px 20px;color:#111827;font-weight:600;font-size:13px;">${opts.courseName}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:12px 20px;color:#6b7280;font-size:13px;">Amount Paid</td>
              <td style="padding:12px 20px;color:#059669;font-weight:800;font-size:18px;">${formattedAmount}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:12px 20px;color:#6b7280;font-size:13px;">Payment Via</td>
              <td style="padding:12px 20px;color:#111827;font-size:13px;text-transform:capitalize;">${opts.gateway}</td>
            </tr>
            <tr style="border-bottom:1px solid #e5e7eb;">
              <td style="padding:12px 20px;color:#6b7280;font-size:13px;">Date</td>
              <td style="padding:12px 20px;color:#111827;font-size:13px;">${formattedDate}</td>
            </tr>
            ${opts.transactionId ? `<tr>
              <td style="padding:12px 20px;color:#6b7280;font-size:13px;">Transaction ID</td>
              <td style="padding:12px 20px;color:#111827;font-family:monospace;font-size:12px;">${opts.transactionId}</td>
            </tr>` : ''}
          </table>
        </div>

        <!-- What's included -->
        <div style="margin:24px 0;">
          <p style="font-weight:700;color:#111827;font-size:15px;margin-bottom:12px;">✅ What you get with your purchase</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${['Lifetime access to all course content','Downloadable resources & materials','Q&A support from instructors','Course completion certificate','Access on any device, anytime'].map(item =>
              `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:#f0fdf4;border-radius:8px;border-left:3px solid #22c55e;">
                <span style="color:#16a34a;font-weight:700;">✓</span>
                <span style="color:#374151;font-size:13px;">${item}</span>
              </div>`
            ).join('')}
          </div>
        </div>

        <p style="color:#6b7280;font-size:13px;text-align:center;margin-top:24px;">
          Questions? Reply to this email or visit our support page.<br/>
          Happy learning! 🚀
        </p>
      `)
    );
  },

  async sendAdminInvite(emailOrOpts: string | { email: string; inviterName: string; token: string }, tokenArg?: string, inviterNameArg?: string): Promise<void> {
    const email     = typeof emailOrOpts === 'string' ? emailOrOpts : emailOrOpts.email;
    const tok       = typeof emailOrOpts === 'string' ? tokenArg! : emailOrOpts.token;
    const inviter   = typeof emailOrOpts === 'string' ? inviterNameArg! : emailOrOpts.inviterName;
    const inviteLink = `${origin}/accept-invite?token=${tok}`;
    await sendMail(email, `You are invited to join ${platform} as Admin`,
      baseTemplate(`
        <h2 style="color:#1f2937;margin-top:0;">Admin Invitation 🛡️</h2>
        <p style="color:#4b5563;">
          <strong>${inviter}</strong> has invited you to join <strong>${platform}</strong> as an Admin.
        </p>
        <p style="color:#4b5563;">Click the button below to set up your admin account:</p>
        <div style="text-align:center;margin:32px 0;">
          <a href="${inviteLink}" style="background:#8b5cf6;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;display:inline-block;">Accept Invitation →</a>
        </div>
        <p style="color:#9ca3af;font-size:13px;">This invitation expires in <strong>24 hours</strong>.</p>
        <p style="color:#9ca3af;font-size:12px;">If you did not expect this invitation, please ignore this email.</p>
      `)
    );
  },
};