import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

import type { IUser } from "../models/user.model";

// ---------- Profile Response DTO ----------

// export interface UserProfileResponseDto {
//   id: string;

//   firstName: string;

//   middleName?: string;

//   lastName: string;

//   email: string;

//   avatar: {
//     public_id: string;
//     url: string;
//   };

//   role: IUser["role"];

//   status: IUser["status"];

//   isVerified: boolean;

//   authProvider: IUser["authProvider"];

//   providerLinked: boolean;

//   courses: Array<{
//     courseId: string;
//   }>;

//   lastLogin?: string;

//   createdAt: string;

//   updatedAt: string;
// }
export interface UserProfileResponseDto {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: IUser["role"];
  status: IUser["status"];
  isVerified: boolean;
  authProvider: IUser["authProvider"];
  providerLinked: boolean;
  hasPassword: boolean;
  courses: Array<{
    courseId: string;
  }>;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Update Profile Request DTO ----------

export class UpdateUserProfileDto {
  @IsString()
  @IsNotEmpty({
    message: "First name is required",
  })
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  @IsNotEmpty({
    message: "Last name is required",
  })
  lastName!: string;

  @IsEmail(undefined, {
    message: "Invalid email address",
  })
  @IsNotEmpty({
    message: "Email is required",
  })
  email!: string;
}

// ---------- Set Password Request DTO ----------

export class SetUserPasswordDto {
  @IsString()
  @IsNotEmpty({
    message: "New password is required",
  })
  @MinLength(6, {
    message: "Password must be at least 6 characters",
  })
  newPassword!: string;

  @IsString()
  @IsNotEmpty({
    message: "Password confirmation is required",
  })
  confirmPassword!: string;
}

// ---------- Change Password Request DTO ----------

export class ChangeUserPasswordDto {
  @IsString()
  @IsNotEmpty({
    message: "Current password is required",
  })
  currentPassword!: string;

  @IsString()
  @IsNotEmpty({
    message: "New password is required",
  })
  @MinLength(6, {
    message: "Password must be at least 6 characters",
  })
  newPassword!: string;

  @IsString()
  @IsNotEmpty({
    message: "Password confirmation is required",
  })
  confirmPassword!: string;
}