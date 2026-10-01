import type { PaginationQueryDto } from "@/types/pagination.types";

export interface CourseQueryDto extends PaginationQueryDto {
  program?: string;
  duration?: string;
  minFee?: number;
  maxFee?: number;
}