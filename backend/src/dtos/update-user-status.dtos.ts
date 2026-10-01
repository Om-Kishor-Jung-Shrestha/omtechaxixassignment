import { IsIn } from "class-validator";
import type { IUser } from "../models/user.model";

export class UpdateUserStatusDto {
  @IsIn(["active", "deactivated"])
  status!: IUser["status"];
}