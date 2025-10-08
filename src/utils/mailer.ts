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
    from: `"Support" ${env.emailFrom}`,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};
