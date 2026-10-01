// import ProgramModel from "../../models/program.model";
// import { toProgramResponseDto } from "../../mapper/program.mapper";
// import type { ProgramQueryDto } from "../../dtos/program-query.dtos";
// import type {
//   PaginatedResponseDto,
//   PaginationMeta,
// } from "../../dtos/pagination-response.dtos";

// export async function getProgramsService(
//   query: ProgramQueryDto
// ): Promise<
//   PaginatedResponseDto<
//     ReturnType<typeof toProgramResponseDto>
//   >
// > {
//   const {
//     page = 1,
//     limit = 10,
//     search,
//     mnemonic,
//     sortBy = "name",
//     sortOrder = "asc",
//   } = query;

//   const filter: Record<string, unknown> = {};

//   if (search?.trim()) {
//     const searchRegex = new RegExp(
//       search.trim(),
//       "i"
//     );

//     filter.$or = [
//       { name: searchRegex },
//       { mnemonic: searchRegex },
//     ];
//   }

//   if (mnemonic?.trim()) {
//     filter.mnemonic = mnemonic
//       .trim()
//       .toUpperCase();
//   }

//   const skip = (page - 1) * limit;

//   const allowedSortFields = [
//     "name",
//     "mnemonic",
//     "createdAt",
//     "updatedAt",
//   ];

//   const safeSortBy = allowedSortFields.includes(
//     sortBy
//   )
//     ? sortBy
//     : "name";

//   const sort: Record<string, 1 | -1> = {
//     [safeSortBy]:
//       sortOrder === "desc" ? -1 : 1,
//   };

//   const [programs, totalItems] = await Promise.all([
//     ProgramModel.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit),

//     ProgramModel.countDocuments(filter),
//   ]);

//   const totalPages = Math.ceil(
//     totalItems / limit
//   );

//   const pagination: PaginationMeta = {
//     page,
//     limit,
//     totalItems,
//     totalPages,
//     hasNextPage: page < totalPages,
//     hasPreviousPage: page > 1,
//   };

//   return {
//     items: programs.map(toProgramResponseDto),
//     pagination,
//   };
// }
import ProgramModel from "../../models/program.model";
import CourseModel from "../../models/course.model";
import { toProgramResponseDto } from "../../mapper/program.mapper";
import type { ProgramQueryDto } from "../../dtos/program-query.dtos";
import type {
  PaginatedResponseDto,
  PaginationMeta,
} from "../../dtos/pagination-response.dtos";

export async function getProgramsService(
  query: ProgramQueryDto
): Promise<
  PaginatedResponseDto<
    ReturnType<typeof toProgramResponseDto>
  >
> {
  const {
    page = 1,
    limit = 10,
    search,
    mnemonic,
    sortBy = "name",
    sortOrder = "asc",
  } = query;

  const filter: Record<string, unknown> = {};

  if (search?.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");

    filter.$or = [
      { name: searchRegex },
      { mnemonic: searchRegex },
    ];
  }

  if (mnemonic?.trim()) {
    filter.mnemonic = mnemonic.trim().toUpperCase();
  }

  const skip = (page - 1) * limit;

  const allowedSortFields = [
    "name",
    "mnemonic",
    "createdAt",
    "updatedAt",
  ];

  const safeSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "name";

  const sort: Record<string, 1 | -1> = {
    [safeSortBy]: sortOrder === "desc" ? -1 : 1,
  };

  const [programs, totalItems] = await Promise.all([
    ProgramModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),

    ProgramModel.countDocuments(filter),
  ]);

  const programIds = programs.map(
    (program) => program._id
  );

  const courses = await CourseModel.find({
    program: { $in: programIds },
  }).select("program duration totalSemesters");

  const courseMap = new Map(
    courses.map((course) => [
      course.program.toString(),
      course,
    ])
  );

  const totalPages = Math.ceil(totalItems / limit);

  const pagination: PaginationMeta = {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };

  return {
    items: programs.map((program) =>
      toProgramResponseDto(
        program,
        courseMap.get(program._id.toString()) ?? null
      )
    ),
    pagination,
  };
}