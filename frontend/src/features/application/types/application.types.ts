import type {
  ApplicationIntake,
  ApplicationStatus,
  ApplicationFileStorage,
  ApplicationFileResourceType,
  HigherEducationBoard,
} from "@/types/application.types";

export interface AcademicHistoryDto {
  collegeOrSchool: string;
  board: HigherEducationBoard;
  gradeOrGpa: string;
}

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

export interface UpdateStatusDto {
  status: ApplicationStatus;
}

export interface ListApplicationsQueryDto {
  search?: string;
  name?: string;
  email?: string;
  phone?: string;
  program?: string;
  status?: ApplicationStatus;
  admissionSession?: string;
  admissionIntake?: ApplicationIntake;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApplicationIdParamDto {
  id: string;
}

export interface ApplicationFileDto {
  storage: ApplicationFileStorage;
  public_id: string;
  url: string;
  path?: string;
  resourceType: ApplicationFileResourceType;
  format: string;
}

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