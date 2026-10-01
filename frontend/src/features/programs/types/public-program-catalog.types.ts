export type PublicProgramCatalogSort =
  | "latest"
  | "fee_asc"
  | "fee_desc"
  | "name_asc"
  | "name_desc";

export interface PublicProgramCatalogQuery {
  search?: string;
  duration?: string;
  minFee?: number;
  maxFee?: number;
  sort?: PublicProgramCatalogSort;
  page?: number;
  limit?: number;
}

export interface PublicProgramCatalogItem {
  id: string;
  mnemonic: string;
  name: string;
  duration: string;
  totalSemesters: number;
  totalFee: number;
}

export interface PublicProgramCatalogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PublicProgramCatalogResponse {
  items: PublicProgramCatalogItem[];
  pagination: PublicProgramCatalogPagination;
}

export interface PublicCourseDetails {
  id: string;

  program: {
    id: string;
    mnemonic: string;
    name: string;
  };

  duration: string;
  totalSemesters: number;

  overview: {
    introduction: string;
    objectives: string[];
    careerOpportunities: string[];
  };

  highlights: string[];

  semesters: PublicCourseSemester[];

  feeStructureFile: {
    public_id: string;
    url: string;
    resourceType: "image" | "raw";
    format: string;
  };

  semesterFees: PublicCourseSemesterFee[];

  totalFee: number;

  createdAt: string;
  updatedAt: string;
}

export interface PublicCourseSemester {
  semesterNumber: number;

  subjects: PublicCourseSubject[];
}

export interface PublicCourseSubject {
  subjectName: string;
  syllabusCode: string;
  isElective: boolean;

  specializedArea?: {
    subjectName: string;
    syllabusCode: string;
  };
}

export interface PublicCourseSemesterFee {
  semesterNumber: number;
  amount: number;
}