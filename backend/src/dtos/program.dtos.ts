import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

// ---------- Request DTOs ----------

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty({
    message: "Program mnemonic is required",
  })
  @MinLength(1, {
    message: "Program mnemonic is required",
  })
  @MaxLength(20, {
    message:
      "Program mnemonic cannot exceed 20 characters",
  })
  mnemonic!: string;

  @IsString()
  @IsNotEmpty({
    message: "Program name is required",
  })
  @MinLength(2, {
    message: "Program name must be at least 2 characters",
  })
  @MaxLength(150, {
    message:
      "Program name cannot exceed 150 characters",
  })
  name!: string;
}

export class UpdateProgramDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: "Program mnemonic cannot be empty",
  })
  @MaxLength(20, {
    message:
      "Program mnemonic cannot exceed 20 characters",
  })
  mnemonic?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: "Program name cannot be empty",
  })
  @MaxLength(150, {
    message:
      "Program name cannot exceed 150 characters",
  })
  name?: string;
}

export class ProgramIdParamDto {
  @IsString()
  @IsNotEmpty({
    message: "Program ID is required",
  })
  id!: string;
}

// ---------- Response DTO ----------

// export interface ProgramResponseDto {
//   id: string;
//   mnemonic: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }
// ---------- Response DTO ----------

export interface ProgramCourseSummaryDto {
  duration: string;
  totalSemesters: number;
}

export interface ProgramResponseDto {
  id: string;
  mnemonic: string;
  name: string;
  course: ProgramCourseSummaryDto | null;
  createdAt: string;
  updatedAt: string;
}