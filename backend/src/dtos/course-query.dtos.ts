import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { PaginationQueryDto } from "./pagination.dtos";

export class CourseQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  program?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxFee?: number;
}