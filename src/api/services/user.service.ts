import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { env } from '../../env';
import { decrypt, encrypt } from '../../utils/encrypt';
import { sendOTPEmail } from '../../utils/mailer';
import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from '../controllers/request/user.request';
import { userRepository } from '../repositories/user.repositorie';

interface OTPData {
  otp: string;
  expiry: Date;
}

@Service()
export class UserService {
  private otpStorage: Map<string, OTPData> = new Map();

  async login(body: LoginRequest): Promise<{ token: string }> {
    const user = await userRepository.findByEmail(body.email);

    if (!user) {
      throw new Error('Invalid email');
    }

    const decryptedPassword = decrypt(user.password);
    const isPasswordValid = body.password === decryptedPassword;

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return { token };
  }

  async sendOTP(body: ForgotPasswordRequest): Promise<void> {
    const user = await userRepository.findByEmail(body.email);
    if (!user) {
      throw new Error('Invalid email');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

    this.otpStorage.set(body.email, {
      otp,
      expiry: otpExpiry,
    });

    await sendOTPEmail(body.email, otp);
  }

  async verifyOTP(body: VerifyOTPRequest): Promise<{ success: boolean }> {
    const otpData = this.otpStorage.get(body.email);
    if (!otpData) {
      throw new Error('No OTP found for this email');
    }

    if (new Date() > otpData.expiry) {
      this.otpStorage.delete(body.email);
      throw new Error('OTP has expired');
    }

    if (otpData.otp !== body.otp) {
      throw new Error('Invalid OTP');
    }

    return { success: true };
  }

  async resetPassword(body: ResetPasswordRequest): Promise<{ success: boolean }> {
    const user = await userRepository.findByEmail(body.email);
    if (!user) {
      throw new Error('Invalid email');
    }

    const encryptedPassword = encrypt(body.newPassword);

    await userRepository.updatePassword(user.id, encryptedPassword);

    return { success: true };
  }

  async forgotPassword(body: ForgotPasswordRequest): Promise<void> {
    await this.sendOTP(body);
  }
}
