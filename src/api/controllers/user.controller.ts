/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError, Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { UserService } from '../services/user.service';
import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  VerifyOTPRequest,
} from './request/user.request';
import {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  VerifyOTPResponse,
} from './responses/forgotPassword.response';
import { LoginResponse } from './responses/login.response';

@Service()
@JsonController('')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(@Body() body: LoginRequest): Promise<LoginResponse> {
    try {
      const { token } = await this.userService.login(body);

      return { accessToken: token, message: 'Login successful' };
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      await this.userService.sendOTP(body);
      return { message: 'OTP sent to your email successfully' };
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
  }

  @Post('/verify-otp')
  async verifyOTP(@Body() body: VerifyOTPRequest): Promise<VerifyOTPResponse> {
    try {
      const result = await this.userService.verifyOTP(body);
      return {
        message: 'OTP verified successfully',
        success: result.success,
      };
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      const result = await this.userService.resetPassword(body);
      return {
        message: 'Password reset successfully',
        success: result.success,
      };
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
  }
}
