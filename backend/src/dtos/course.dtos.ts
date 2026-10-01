

import { Type } from "class-transformer";

import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ArrayMaxSize,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";

// ---------- Specialized Area ----------

export class CourseSpecializedAreaDto {
  @IsString()
  @IsNotEmpty({
    message: "Specialized area subject name is required",
  })
  @MaxLength(150, {
    message:
      "Specialized area subject name cannot exceed 150 characters",
  })
  subjectName!: string;

  @IsString()
  @IsNotEmpty({
    message:
      "Specialized area syllabus code is required",
  })
  @MaxLength(50, {
    message:
      "Specialized area syllabus code cannot exceed 50 characters",
  })
  syllabusCode!: string;
}

// ---------- Subject ----------

export class CourseSubjectDto {
  @IsString()
  @IsNotEmpty({
    message: "Subject name is required",
  })
  @MaxLength(150, {
    message: "Subject name cannot exceed 150 characters",
  })
  subjectName!: string;

  @IsString()
  @IsNotEmpty({
    message: "Syllabus code is required",
  })
  @MaxLength(50, {
    message:
      "Syllabus code cannot exceed 50 characters",
  })
  syllabusCode!: string;

  @IsBoolean()
  isElective!: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CourseSpecializedAreaDto)
  specializedArea?: CourseSpecializedAreaDto;
}

// ---------- Semester ----------

export class CourseSemesterDto {
  @IsInt()
  @Min(1, {
    message: "Semester number must be at least 1",
  })
  semesterNumber!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseSubjectDto)
  subjects!: CourseSubjectDto[];
}

// ---------- Overview ----------

export class CourseOverviewDto {
  @IsString()
  @IsNotEmpty({
    message: "Course introduction is required",
  })
  introduction!: string;

  @IsArray()
  @IsString({ each: true })
  objectives!: string[];

  @IsArray()
  @IsString({ each: true })
  careerOpportunities!: string[];
}

// ---------- Fee Structure File ----------

export class CourseFeeStructureFileDto {
  @IsString()
  @IsNotEmpty({
    message: "Fee structure file public ID is required",
  })
  public_id!: string;

  @IsString()
  @IsNotEmpty({
    message: "Fee structure file URL is required",
  })
  url!: string;

  @IsEnum(["image", "raw"], {
    message:
      "Fee structure resource type must be image or raw",
  })
  resourceType!: "image" | "raw";

  @IsString()
  @IsNotEmpty({
    message: "File format is required",
  })
  format!: string;
}

// ---------- Semester Fee ----------

export class CourseSemesterFeeDto {
  @IsInt()
  @Min(1, {
    message: "Semester number must be at least 1",
  })
  semesterNumber!: number;

  @IsNumber()
  @Min(0, {
    message: "Semester fee cannot be negative",
  })
  amount!: number;
}

// ---------- Create Course ----------

export class CreateCourseDto {
  @IsMongoId({
    message: "Invalid program ID",
  })
  program!: string;

  @IsString()
  @IsNotEmpty({
    message: "Course duration is required",
  })
  @MaxLength(50, {
    message: "Course duration cannot exceed 50 characters",
  })
  duration!: string;

  @IsInt()
  @Min(1, {
    message: "Total semesters must be at least 1",
  })
  @Max(20, {
    message: "Total semesters cannot exceed 20",
  })
  totalSemesters!: number;

  @ValidateNested()
  @Type(() => CourseOverviewDto)
  overview!: CourseOverviewDto;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5, {
    message: "A course can have a maximum of 5 highlights",
  })
  highlights!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseSemesterDto)
  semesters!: CourseSemesterDto[];

  @ValidateNested()
  @Type(() => CourseFeeStructureFileDto)
  feeStructureFile!: CourseFeeStructureFileDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseSemesterFeeDto)
  semesterFees!: CourseSemesterFeeDto[];
}

// ---------- Update Course ----------

export class UpdateCourseDto {
  @IsOptional()
  @IsMongoId({
    message: "Invalid program ID",
  })
  program?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({
    message: "Course duration cannot be empty",
  })
  @MaxLength(50, {
    message: "Course duration cannot exceed 50 characters",
  })
  duration?: string;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: "Total semesters must be at least 1",
  })
  @Max(20, {
    message: "Total semesters cannot exceed 20",
  })
  totalSemesters?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CourseOverviewDto)
  overview?: CourseOverviewDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseSemesterDto)
  semesters?: CourseSemesterDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CourseFeeStructureFileDto)
  feeStructureFile?: CourseFeeStructureFileDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseSemesterFeeDto)
  semesterFees?: CourseSemesterFeeDto[];
}

// ---------- Course ID ----------

export class CourseIdParamDto {
  @IsMongoId({
    message: "Invalid course ID",
  })
  id!: string;
}

// ---------- Response DTOs ----------

export interface CourseResponseDto {
  id: string;

  program: string;

  duration: string;

  totalSemesters: number;

  overview: {
    introduction: string;
    objectives: string[];
    careerOpportunities: string[];
  };

  highlights: string[];

  semesters: Array<{
    semesterNumber: number;

    subjects: Array<{
      subjectName: string;
      syllabusCode: string;
      isElective: boolean;

      specializedArea?: {
        subjectName: string;
        syllabusCode: string;
      };
    }>;
  }>;

  feeStructureFile: {
    public_id: string;
    url: string;
    resourceType: "image" | "raw";
    format: string;
  };

  semesterFees: Array<{
    semesterNumber: number;
    amount: number;
  }>;

  totalFee: number;

  createdAt: string;
  updatedAt: string;
}