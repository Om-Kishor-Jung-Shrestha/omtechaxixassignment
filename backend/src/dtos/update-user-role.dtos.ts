import { IsIn } from "class-validator";
import type { IUser } from "../models/user.model";

export class UpdateUserRoleDto {
  @IsIn(["user", "admin", "superadmin"])
  role!: IUser["role"];
}