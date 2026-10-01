export interface CourseSpecializedAreaDto {
  subjectName: string;
  syllabusCode: string;
}

export interface CourseSubjectDto {
  subjectName: string;
  syllabusCode: string;
  isElective: boolean;
  specializedArea?: CourseSpecializedAreaDto;
}

export interface CourseSemesterDto {
  semesterNumber: number;
  subjects: CourseSubjectDto[];
}

export interface CourseOverviewDto {
  introduction: string;
  objectives: string[];
  careerOpportunities: string[];
}

export interface CourseFeeStructureFileDto {
  public_id: string;
  url: string;
  resourceType: "image" | "raw";
  format: string;
}

export interface CourseSemesterFeeDto {
  semesterNumber: number;
  amount: number;
}

export interface CreateCourseDto {
  program: string;
  duration: string;
  totalSemesters: number;
  overview: CourseOverviewDto;
  highlights: string[];
  semesters: CourseSemesterDto[];
  feeStructureFile: CourseFeeStructureFileDto;
  semesterFees: CourseSemesterFeeDto[];
}

export interface UpdateCourseDto {
  program?: string;
  duration?: string;
  totalSemesters?: number;
  overview?: CourseOverviewDto;
  highlights?: string[];
  semesters?: CourseSemesterDto[];
  feeStructureFile?: CourseFeeStructureFileDto;
  semesterFees?: CourseSemesterFeeDto[];
}

export interface CourseIdParamDto {
  id: string;
}

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