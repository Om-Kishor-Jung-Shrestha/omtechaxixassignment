// export interface CreateProgramDto {
//   mnemonic: string;
//   name: string;
// }

// export interface UpdateProgramDto {
//   mnemonic?: string;
//   name?: string;
// }

// export interface ProgramIdParamDto {
//   id: string;
// }

// export interface ProgramResponseDto {
//   id: string;
//   mnemonic: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
// }
export interface CreateProgramDto {
  mnemonic: string;
  name: string;
}

export interface UpdateProgramDto {
  mnemonic?: string;
  name?: string;
}

export interface ProgramIdParamDto {
  id: string;
}

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

export interface ProgramPaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProgramListResponseDto {
  items: ProgramResponseDto[];
  pagination: ProgramPaginationMeta;
}