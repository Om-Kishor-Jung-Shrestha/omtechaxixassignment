import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import type { IUser } from "../models/user.model";

export class InviteUserDto {
  @IsEmail(undefined, {
    message: "Invalid email address",
  })
  email!: string;

  @IsString()
  @IsNotEmpty({
    message: "First name is required",
  })
  @MaxLength(100)
  firstName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  middleName?: string;

  @IsString()
  @IsNotEmpty({
    message: "Last name is required",
  })
  @MaxLength(100)
  lastName!: string;

  @IsIn(["user", "admin", "superadmin"])
  role!: IUser["role"];
}