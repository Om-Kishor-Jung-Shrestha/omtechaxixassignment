import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "./pagination.dtos";

export class ProgramQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  mnemonic?: string;
}