import type {
  ApplicationFileResourceType,
  ApplicationFileStorage,
  ApplicationIntake,
  ApplicationStatus,
  HigherEducationBoard,
} from "@/types/application.types";

/*
|--------------------------------------------------------------------------
| Academic History
|--------------------------------------------------------------------------
*/

export interface AcademicHistoryDto {
  collegeOrSchool: string;
  board: HigherEducationBoard;
  gradeOrGpa: string;
}

/*
|--------------------------------------------------------------------------
| Create Application
|--------------------------------------------------------------------------
*/

export interface CreateApplicationDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  admissionSession: string;
  admissionIntake: ApplicationIntake;
  academicQualification: string;
  academicHistory: AcademicHistoryDto;
  address: string;
  status?: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| Update Application
|--------------------------------------------------------------------------
*/

export interface UpdateApplicationDto {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  program?: string;
  admissionSession?: string;
  admissionIntake?: ApplicationIntake;
  academicQualification?: string;
  academicHistory?: AcademicHistoryDto;
  address?: string;
  status?: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export interface UpdateStatusDto {
  status: ApplicationStatus;
}

/*
|--------------------------------------------------------------------------
| List Applications Query
|--------------------------------------------------------------------------
*/

export interface ListApplicationsQueryDto {
  /*
  |--------------------------------------------------------------------------
  | Applicant Filters
  |--------------------------------------------------------------------------
  */

  search?: string;

  name?: string;

  email?: string;

  phone?: string;

  /*
  |--------------------------------------------------------------------------
  | Application Filters
  |--------------------------------------------------------------------------
  */

  program?: string;

  status?: ApplicationStatus;

  admissionSession?: string;

  admissionIntake?: ApplicationIntake;

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  page?: number;

  limit?: number;

  /*
  |--------------------------------------------------------------------------
  | Sorting
  |--------------------------------------------------------------------------
  */

  sortBy?: string;

  sortOrder?: "asc" | "desc";
}

/*
|--------------------------------------------------------------------------
| Application ID
|--------------------------------------------------------------------------
*/

export interface ApplicationIdParamDto {
  id: string;
}

/*
|--------------------------------------------------------------------------
| Application File
|--------------------------------------------------------------------------
*/

export interface ApplicationFileDto {
  storage: ApplicationFileStorage;

  public_id: string;

  url: string;

  path?: string;

  resourceType: ApplicationFileResourceType;

  format: string;
}

/*
|--------------------------------------------------------------------------
| Application Program
|--------------------------------------------------------------------------
|
| The backend now populates program instead of returning
| only the MongoDB ObjectId.
|
|--------------------------------------------------------------------------
*/
export interface ApplicationProgramResponseDto {
  id: string;
  mnemonic: string;
  name: string;
}

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
  academicHistory: AcademicHistoryDto;
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

/*
|--------------------------------------------------------------------------
| Application Document
|--------------------------------------------------------------------------
*/

export type ApplicationDocumentField =
  | "citizenship"
  | "cover"
  | "characterCertificate"
  | "document"
  | "marksheet12"
  | "applicantImage";

/*
|--------------------------------------------------------------------------
| Application Document Item
|--------------------------------------------------------------------------
*/

export interface ApplicationDocumentItem {
  field: ApplicationDocumentField;

  label: string;

  file: ApplicationFileDto;
}