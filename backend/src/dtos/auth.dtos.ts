import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

import { IUser } from "../models/user.model";

// ---------- Request DTOs ----------

export class LoginDto {
  @IsEmail(undefined, {
    message: "Invalid email address",
  })
  @IsString()
  @IsNotEmpty({
    message: "Email is required",
  })
  email!: string;

  @IsString()
  @IsNotEmpty({
    message: "Password is required",
  })
  password!: string;
}

// ---------- Response DTOs ----------

export interface UserResponseDto {
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

  courses: Array<{
    courseId: string;
  }>;

  lastLogin?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
}