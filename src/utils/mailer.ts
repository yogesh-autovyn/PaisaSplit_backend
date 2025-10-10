import * as nodemailer from 'nodemailer';
import { env } from '../env';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // or your SMTP server
  port: 587,
  secure: false,
  auth: {
    user: env.emailUsername,
    pass: env.emailPassword,
  },
});
export const sendResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
  await transporter.sendMail({
    from: `"Support" <${env.emailUsername}>`,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Support" <${env.emailUsername}>`,
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: #007bff; font-size: 36px; text-align: center; margin: 20px 0;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};
