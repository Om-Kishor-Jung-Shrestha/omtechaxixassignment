import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsMongoId,
  Max,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export type PublicCatalogSort =
  | "latest"
  | "fee_asc"
  | "fee_desc"
  | "name_asc"
  | "name_desc";

export class PublicProgramCatalogQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxFee?: number;

  @IsOptional()
  @IsIn([
    "latest",
    "fee_asc",
    "fee_desc",
    "name_asc",
    "name_desc",
  ])
  sort?: PublicCatalogSort;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}

export interface PublicProgramCatalogItemDto {
  id: string;
  mnemonic: string;
  name: string;
  duration: string;
  totalSemesters: number;
  totalFee: number;
}

export interface PublicProgramCatalogResponseDto {
  items: PublicProgramCatalogItemDto[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface PublicCourseDetailsDto {
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

export class PublicCourseDetailsParamsDto {
  @IsString()
  @IsMongoId()
  id!: string;
}