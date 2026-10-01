import { IsMongoId } from "class-validator";

export class UserIdParamDto {
  @IsMongoId({
    message: "Invalid user ID",
  })
  id!: string;
}