import type {
  CourseFeeStructureFileDto,
  CourseSemesterDto,
  CourseSemesterFeeDto,
  CourseOverviewDto,
  CourseSpecializedAreaDto,
  CourseSubjectDto,
} from "@/features/programs/types/course.types";

export type CourseBuilderTab =
  | "course-info"
  | "semesters"
  | "overview"
  | "highlights"
  | "fees";

export interface CourseBuilderForm {
  program: string;
  duration: string;
  totalSemesters: number;

  overview: CourseOverviewDto;

  highlights: string[];

  semesters: CourseSemesterDto[];

  feeStructureFile: CourseFeeStructureFileDto | null;

  semesterFees: CourseSemesterFeeDto[];
}

export interface CourseSubjectForm extends CourseSubjectDto {
  specializedArea?: CourseSpecializedAreaDto;
}

export interface CourseBuilderProgram {
  id: string;
  mnemonic: string;
  name: string;
}