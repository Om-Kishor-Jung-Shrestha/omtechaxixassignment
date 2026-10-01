// import {
//   // ArrayMaxSize,
//   // ArrayMinSize,
//   // IsArray,
//   IsEmail,
//   IsEnum,
//   IsIn,
//   IsInt,
//   IsMongoId,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   Matches,
//   Max,
//   MaxLength,
//   Min,
//   MinLength,
//   ValidateNested,
// } from "class-validator";
// import { Type } from "class-transformer";

// import {
//   APPLICATION_INTAKES,
//   APPLICATION_STATUSES,
//   HIGHER_EDUCATION_BOARDS,
//   ApplicationIntake,
//   ApplicationStatus,
//   HigherEducationBoard,
// } from "../models/application.model";

// export class AcademicHistoryDto {
//   @IsString()
//   @IsNotEmpty({
//     message: "College or school name is required",
//   })
//   @MinLength(2, {
//     message:
//       "College or school name must be at least 2 characters",
//   })
//   @MaxLength(200, {
//     message:
//       "College or school name cannot exceed 200 characters",
//   })
//   collegeOrSchool!: string;

//   @IsEnum(HIGHER_EDUCATION_BOARDS, {
//     message: "Invalid higher education board",
//   })
//   board!: HigherEducationBoard;

//   @IsString()
//   @IsNotEmpty({
//     message: "Grade or GPA is required",
//   })
//   @MaxLength(20, {
//     message: "Grade or GPA cannot exceed 20 characters",
//   })
//   gradeOrGpa!: string;
// }

// export class CreateApplicationDto {
//   @IsString()
//   @IsNotEmpty({
//     message: "First name is required",
//   })
//   @MinLength(2, {
//     message: "First name must be at least 2 characters",
//   })
//   @MaxLength(50, {
//     message: "First name cannot exceed 50 characters",
//   })
//   firstName!: string;

//   @IsOptional()
//   @IsString()
//   @MaxLength(50, {
//     message: "Middle name cannot exceed 50 characters",
//   })
//   middleName?: string;

//   @IsString()
//   @IsNotEmpty({
//     message: "Last name is required",
//   })
//   @MinLength(2, {
//     message: "Last name must be at least 2 characters",
//   })
//   @MaxLength(50, {
//     message: "Last name cannot exceed 50 characters",
//   })
//   lastName!: string;

//   @IsEmail({}, {
//     message: "Invalid email address",
//   })
//   email!: string;

//   @IsString()
//   @IsNotEmpty({
//     message: "Phone number is required",
//   })
//   @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
//     message: "Invalid phone number",
//   })
//   phone!: string;

//   @IsMongoId({
//     message: "Invalid program ID",
//   })
//   program!: string;

//   @IsString()
//   @IsNotEmpty({
//     message: "Admission session is required",
//   })
//   @Matches(/^\d{4}\/\d{4}$/, {
//     message:
//       "Admission session must be in YYYY/YYYY format",
//   })
//   admissionSession!: string;

//   @IsEnum(APPLICATION_INTAKES, {
//     message: "Invalid admission intake",
//   })
//   admissionIntake!: ApplicationIntake;

//   @IsString()
//   @IsNotEmpty({
//     message: "Academic qualification is required",
//   })
//   @MinLength(2, {
//     message:
//       "Academic qualification must be at least 2 characters",
//   })
//   @MaxLength(200, {
//     message:
//       "Academic qualification cannot exceed 200 characters",
//   })
//   academicQualification!: string;

//   @ValidateNested()
//   @Type(() => AcademicHistoryDto)
//   academicHistory!: AcademicHistoryDto;

//   @IsString()
//   @IsNotEmpty({
//     message: "Address is required",
//   })
//   @MinLength(5, {
//     message: "Address must be at least 5 characters",
//   })
//   @MaxLength(300, {
//     message: "Address cannot exceed 300 characters",
//   })
//   address!: string;

//   @IsOptional()
//   @IsEnum(APPLICATION_STATUSES, {
//     message: "Invalid application status",
//   })
//   status?: ApplicationStatus;
// }

// export class UpdateApplicationDto {
//   @IsOptional()
//   @IsString()
//   @MinLength(2)
//   @MaxLength(50)
//   firstName?: string;

//   @IsOptional()
//   @IsString()
//   @MaxLength(50)
//   middleName?: string;

//   @IsOptional()
//   @IsString()
//   @MinLength(2)
//   @MaxLength(50)
//   lastName?: string;

//   @IsOptional()
//   @IsEmail({}, {
//     message: "Invalid email address",
//   })
//   email?: string;

//   @IsOptional()
//   @IsString()
//   @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
//     message: "Invalid phone number",
//   })
//   phone?: string;

//   @IsOptional()
//   @IsMongoId({
//     message: "Invalid program ID",
//   })
//   program?: string;

//   @IsOptional()
//   @IsString()
//   @Matches(/^\d{4}\/\d{4}$/, {
//     message:
//       "Admission session must be in YYYY/YYYY format",
//   })
//   admissionSession?: string;

//   @IsOptional()
//   @IsEnum(APPLICATION_INTAKES, {
//     message: "Invalid admission intake",
//   })
//   admissionIntake?: ApplicationIntake;

//   @IsOptional()
//   @IsString()
//   @MinLength(2)
//   @MaxLength(200)
//   academicQualification?: string;

//   @IsOptional()
//   @ValidateNested()
//   @Type(() => AcademicHistoryDto)
//   academicHistory?: AcademicHistoryDto;

//   @IsOptional()
//   @IsString()
//   @MinLength(5)
//   @MaxLength(300)
//   address?: string;

//   @IsOptional()
//   @IsEnum(APPLICATION_STATUSES, {
//     message: "Invalid application status",
//   })
//   status?: ApplicationStatus;
// }

// export class UpdateStatusDto {
//   @IsEnum(APPLICATION_STATUSES, {
//     message: "Invalid application status",
//   })
//   status!: ApplicationStatus;
// }

// // export class ListApplicationsQueryDto {
// //   @IsOptional()
// //   @IsString()
// //   search?: string;

// //   @IsOptional()
// //   @IsMongoId({
// //     message: "Invalid program ID",
// //   })
// //   program?: string;

// //   @IsOptional()
// //   @IsEnum(APPLICATION_STATUSES, {
// //     message: "Invalid application status",
// //   })
// //   status?: ApplicationStatus;

// //   @IsOptional()
// //   @IsString()
// //   @Matches(/^\d{4}\/\d{4}$/, {
// //     message:
// //       "Admission session must be in YYYY/YYYY format",
// //   })
// //   admissionSession?: string;

// //   @IsOptional()
// //   @IsEnum(APPLICATION_INTAKES, {
// //     message: "Invalid admission intake",
// //   })
// //   admissionIntake?: ApplicationIntake;

// //   @IsOptional()
// //   @Type(() => Number)
// //   @IsInt()
// //   @Min(1)
// //   page: number = 1;

// //   @IsOptional()
// //   @Type(() => Number)
// //   @IsInt()
// //   @Min(1)
// //   @Max(100)
// //   limit: number = 10;
// // }

// export class ListApplicationsQueryDto {
//   @IsOptional()
//   @IsString()
//   search?: string;

//   @IsOptional()
//   @IsMongoId()
//   program?: string;

//   @IsOptional()
//   @IsIn(APPLICATION_STATUSES)
//   status?: ApplicationStatus;

//   @IsOptional()
//   @IsString()
//   admissionSession?: string;

//   @IsOptional()
//   @IsIn(APPLICATION_INTAKES)
//   admissionIntake?: ApplicationIntake;

//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   page: number = 1;

//   @IsOptional()
//   @Type(() => Number)
//   @IsInt()
//   @Min(1)
//   @Max(100)
//   limit: number = 10;

//   @IsOptional()
//   @IsString()
//   sortBy: string = "createdAt";

//   @IsOptional()
//   @IsIn(["asc", "desc"])
//   sortOrder: "asc" | "desc" = "desc";
// }

// export class ApplicationIdParamDto {
//   @IsMongoId({
//     message: "Invalid application ID",
//   })
//   id!: string;
// }

// export interface ApplicationFileDto {
//   storage: "cloudinary" | "local";
//   public_id: string;
//   url: string;
//   path?: string;
//   resourceType: "image" | "raw";
//   format: string;
// }

// export interface ApplicationResponseDto {
//   id: string;

//   firstName: string;
//   middleName?: string;
//   lastName: string;

//   email: string;
//   phone: string;

//   program: string;

//   admissionSession: string;
//   admissionIntake: ApplicationIntake;

//   academicQualification: string;

//   academicHistory: {
//     collegeOrSchool: string;
//     board: HigherEducationBoard;
//     gradeOrGpa: string;
//   };

//   address: string;

//   status: ApplicationStatus;

//   documents: {
//     citizenship: ApplicationFileDto;
//     cover: ApplicationFileDto;
//     characterCertificate: ApplicationFileDto;
//     document: ApplicationFileDto;
//     marksheet12: ApplicationFileDto;
//   };

//   applicantImage: ApplicationFileDto;

//   createdBy?: string;

//   createdAt: string;
//   updatedAt: string;
// }

// export interface PaginatedApplicationsResponseDto {
//   data: ApplicationResponseDto[];

//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//   };
// }


import {
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

import {
  APPLICATION_INTAKES,
  APPLICATION_STATUSES,
  HIGHER_EDUCATION_BOARDS,
  ApplicationIntake,
  ApplicationStatus,
  HigherEducationBoard,
} from "../models/application.model";

/*
|--------------------------------------------------------------------------
| Academic History
|--------------------------------------------------------------------------
*/

export class AcademicHistoryDto {
  @IsString()
  @IsNotEmpty({
    message: "College or school name is required",
  })
  @MinLength(2, {
    message:
      "College or school name must be at least 2 characters",
  })
  @MaxLength(200, {
    message:
      "College or school name cannot exceed 200 characters",
  })
  collegeOrSchool!: string;

  @IsEnum(HIGHER_EDUCATION_BOARDS, {
    message: "Invalid higher education board",
  })
  board!: HigherEducationBoard;

  @IsString()
  @IsNotEmpty({
    message: "Grade or GPA is required",
  })
  @MaxLength(20, {
    message:
      "Grade or GPA cannot exceed 20 characters",
  })
  gradeOrGpa!: string;
}

/*
|--------------------------------------------------------------------------
| Create Application
|--------------------------------------------------------------------------
*/

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty({
    message: "First name is required",
  })
  @MinLength(2, {
    message: "First name must be at least 2 characters",
  })
  @MaxLength(50, {
    message: "First name cannot exceed 50 characters",
  })
  firstName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: "Middle name cannot exceed 50 characters",
  })
  middleName?: string;

  @IsString()
  @IsNotEmpty({
    message: "Last name is required",
  })
  @MinLength(2, {
    message: "Last name must be at least 2 characters",
  })
  @MaxLength(50, {
    message: "Last name cannot exceed 50 characters",
  })
  lastName!: string;

  @IsEmail(
    {},
    {
      message: "Invalid email address",
    }
  )
  email!: string;

  @IsString()
  @IsNotEmpty({
    message: "Phone number is required",
  })
  @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
    message: "Invalid phone number",
  })
  phone!: string;

  @IsMongoId({
    message: "Invalid program ID",
  })
  program!: string;

  @IsString()
  @IsNotEmpty({
    message: "Admission session is required",
  })
  @Matches(/^\d{4}\/\d{4}$/, {
    message:
      "Admission session must be in YYYY/YYYY format",
  })
  admissionSession!: string;

  @IsEnum(APPLICATION_INTAKES, {
    message: "Invalid admission intake",
  })
  admissionIntake!: ApplicationIntake;

  @IsString()
  @IsNotEmpty({
    message: "Academic qualification is required",
  })
  @MinLength(2, {
    message:
      "Academic qualification must be at least 2 characters",
  })
  @MaxLength(200, {
    message:
      "Academic qualification cannot exceed 200 characters",
  })
  academicQualification!: string;

  @ValidateNested()
  @Type(() => AcademicHistoryDto)
  academicHistory!: AcademicHistoryDto;

  @IsString()
  @IsNotEmpty({
    message: "Address is required",
  })
  @MinLength(5, {
    message: "Address must be at least 5 characters",
  })
  @MaxLength(300, {
    message:
      "Address cannot exceed 300 characters",
  })
  address!: string;

  @IsOptional()
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status?: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| Update Application
|--------------------------------------------------------------------------
*/

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  middleName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: "Invalid email address",
    }
  )
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
    message: "Invalid phone number",
  })
  phone?: string;

  @IsOptional()
  @IsMongoId({
    message: "Invalid program ID",
  })
  program?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}\/\d{4}$/, {
    message:
      "Admission session must be in YYYY/YYYY format",
  })
  admissionSession?: string;

  @IsOptional()
  @IsEnum(APPLICATION_INTAKES, {
    message: "Invalid admission intake",
  })
  admissionIntake?: ApplicationIntake;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  academicQualification?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AcademicHistoryDto)
  academicHistory?: AcademicHistoryDto;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(300)
  address?: string;

  @IsOptional()
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status?: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export class UpdateStatusDto {
  @IsEnum(APPLICATION_STATUSES, {
    message: "Invalid application status",
  })
  status!: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| List Applications Query
|--------------------------------------------------------------------------
*/

export class ListApplicationsQueryDto {
  /*
  |--------------------------------------------------------------------------
  | General Search
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsString()
  search?: string;

  /*
  |--------------------------------------------------------------------------
  | Applicant Filters
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  /*
  |--------------------------------------------------------------------------
  | Application Filters
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsMongoId({
    message: "Invalid program ID",
  })
  program?: string;

  @IsOptional()
  @IsIn(APPLICATION_STATUSES)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  admissionSession?: string;

  @IsOptional()
  @IsIn(APPLICATION_INTAKES)
  admissionIntake?: ApplicationIntake;

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  @IsOptional()
  @IsString()
  sortBy: string = "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder: "asc" | "desc" = "desc";
}

/*
|--------------------------------------------------------------------------
| Application ID
|--------------------------------------------------------------------------
*/

export class ApplicationIdParamDto {
  @IsMongoId({
    message: "Invalid application ID",
  })
  id!: string;
}



export class ApplicationFileParamDto {
  @IsMongoId({
    message: "Invalid application ID",
  })
  id!: string;

  @IsString({
    message: "Application file field is required",
  })
  @IsNotEmpty({
    message: "Application file field is required",
  })
  field!: string;
}
/*
|--------------------------------------------------------------------------
| Application File Response
|--------------------------------------------------------------------------
*/

export interface ApplicationFileDto {
  storage: "cloudinary" | "local";
  public_id: string;
  url: string;
  path?: string;
  resourceType: "image" | "raw";
  format: string;
}

/*
|--------------------------------------------------------------------------
| Application Program Response
|--------------------------------------------------------------------------
*/

export interface ApplicationProgramResponseDto {
  id: string;
  mnemonic: string;
  name: string;
}

/*
|--------------------------------------------------------------------------
| Application Response
|--------------------------------------------------------------------------
*/

export interface ApplicationResponseDto {
  id: string;

  firstName: string;

  middleName?: string;

  lastName: string;

  email: string;

  phone: string;

  program: ApplicationProgramResponseDto;

  admissionSession: string;

  admissionIntake: ApplicationIntake;

  academicQualification: string;

  academicHistory: {
    collegeOrSchool: string;
    board: HigherEducationBoard;
    gradeOrGpa: string;
  };

  address: string;

  status: ApplicationStatus;

  documents: {
    citizenship: ApplicationFileDto;
    cover: ApplicationFileDto;
    characterCertificate: ApplicationFileDto;
    document: ApplicationFileDto;
    marksheet12: ApplicationFileDto;
  };

  applicantImage: ApplicationFileDto;

  createdBy?: string;

  createdAt: string;

  updatedAt: string;
}

/*
|--------------------------------------------------------------------------
| Paginated Applications Response
|--------------------------------------------------------------------------
*/

export interface PaginatedApplicationsResponseDto {
  data: ApplicationResponseDto[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
