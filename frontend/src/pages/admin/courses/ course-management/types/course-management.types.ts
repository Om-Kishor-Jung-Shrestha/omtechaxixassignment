// import type { CourseResponseDto } from "@/features/programs/types/course.types";

// export interface CourseManagementFilters {
//   search: string;
//   program: string;
//   duration: string;
//   minFee: string;
//   maxFee: string;
// }

// export interface CoursesTableProps {
//   courses: CourseResponseDto[];
//   onView: (course: CourseResponseDto) => void;
//   onEdit: (course: CourseResponseDto) => void;
//   onDelete: (course: CourseResponseDto) => void;
//   isDeleting?: boolean;
//   deletingCourseId?: string | null;
// }

// export interface CoursesSearchProps {
//   filters: CourseManagementFilters;
//   onFiltersChange: (
//     filters: CourseManagementFilters,
//   ) => void;
//   onReset: () => void;
// }

// export interface CoursesPaginationProps {
//   currentPage: number;
//   totalPages: number;
//   totalItems: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   onPageChange: (page: number) => void;
// }

import type { CourseResponseDto } from "@/features/programs/types/course.types";
import type { ProgramResponseDto } from "@/features/programs/types/program.types";

export interface CourseManagementFilters {
  search: string;
  program: string;
  duration: string;
  minFee: string;
  maxFee: string;
}

export interface CoursesTableProps {
  courses: CourseResponseDto[];
  programs: ProgramResponseDto[];
  onView: (course: CourseResponseDto) => void;
  onEdit: (course: CourseResponseDto) => void;
  onDelete: (course: CourseResponseDto) => void;
  isDeleting?: boolean;
  deletingCourseId?: string | null;
}

export interface CoursesSearchProps {
  filters: CourseManagementFilters;
  programs: ProgramResponseDto[];
  onFiltersChange: (
    filters: CourseManagementFilters,
  ) => void;
  onReset: () => void;
}

export interface CoursesPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}