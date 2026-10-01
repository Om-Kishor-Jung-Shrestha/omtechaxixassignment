import {
  IsBoolean,
  IsIn,
  IsMongoId,
  IsOptional,

} from "class-validator";
import { Type } from "class-transformer";
import { PaginationQueryDto } from "./pagination.dtos";
import type { IUser } from "../models/user.model";

export class UserQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(["user", "admin", "superadmin"])
  role?: IUser["role"];

  @IsOptional()
  @IsIn(["active", "deactivated"])
  status?: IUser["status"];

  @IsOptional()
  @IsIn(["local", "google"])
  authProvider?: IUser["authProvider"];

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsMongoId()
  courseId?: string;
}