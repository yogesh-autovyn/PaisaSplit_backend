import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ForgotPasswordRequest {
  @IsEmail()
  email: string;
}

export class VerifyOTPRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}

export class ResetPasswordRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
