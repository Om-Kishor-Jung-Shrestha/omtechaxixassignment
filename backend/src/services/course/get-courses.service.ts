import CourseModel from "../../models/course.model";
// import { toCourseResponseDto } from "../../mappers/course.mapper";
import type { CourseQueryDto } from "../../dtos/course-query.dtos";
import type {
  PaginatedResponseDto,
  PaginationMeta,
} from "../../dtos/pagination-response.dtos";
import { toCourseResponseDto } from "../../mapper/course.mapper";

export async function getCoursesService(
  query: CourseQueryDto
): Promise<
  PaginatedResponseDto<
    ReturnType<typeof toCourseResponseDto>
  >
> {
  const {
    page = 1,
    limit = 10,
    search,
    program,
    duration,
    minFee,
    maxFee,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  const filter: Record<string, unknown> = {};

  if (search?.trim()) {
    const searchRegex = new RegExp(
      search.trim(),
      "i"
    );

    filter.$or = [
      { duration: searchRegex },
      { highlights: searchRegex },
      { "overview.introduction": searchRegex },
      {
        "overview.objectives": searchRegex,
      },
      {
        "overview.careerOpportunities": searchRegex,
      },
      {
        "semesters.subjects.subjectName":
          searchRegex,
      },
      {
        "semesters.subjects.syllabusCode":
          searchRegex,
      },
    ];
  }

  if (program) {
    filter.program = program;
  }

  if (duration?.trim()) {
    filter.duration = new RegExp(
      duration.trim(),
      "i"
    );
  }

  if (
    minFee !== undefined ||
    maxFee !== undefined
  ) {
    const feeFilter: Record<string, number> = {};

    if (minFee !== undefined) {
      feeFilter.$gte = minFee;
    }

    if (maxFee !== undefined) {
      feeFilter.$lte = maxFee;
    }

    filter.totalFee = feeFilter;
  }

  const skip = (page - 1) * limit;

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "duration",
    "totalSemesters",
    "totalFee",
  ];

  const safeSortBy = allowedSortFields.includes(
    sortBy
  )
    ? sortBy
    : "createdAt";

  const sort: Record<string, 1 | -1> = {
    [safeSortBy]:
      sortOrder === "desc" ? -1 : 1,
  };

  const [courses, totalItems] = await Promise.all([
    CourseModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),

    CourseModel.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(
    totalItems / limit
  );

  const pagination: PaginationMeta = {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    items: courses.map(toCourseResponseDto),
    pagination,
  };
}