import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class GroupSettingsRequest {
  @IsBoolean()
  allowAllToAddExpense: boolean;

  @IsBoolean()
  inviteOtherAccess: boolean;

  @IsBoolean()
  sendNotifications: boolean;
}

export class CreateGroupRequest {
  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsOptional()
  @IsString()
  groupIcon?: string;

  @IsNotEmpty()
  @IsString()
  groupType: string;

  @IsArray()
  @IsEmail({}, { each: true })
  emails: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => GroupSettingsRequest)
  groupSettings: GroupSettingsRequest;

  @IsString()
  createdBy: string;
}
