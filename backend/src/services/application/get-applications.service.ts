// import ApplicationModel from "../../models/application.model";

// import {
//   toApplicationFilter,
//   toApplicationResponseDto,
// } from "../../mapper/applicaiton.mapper";

// import type { ListApplicationsQueryDto } from "../../dtos/application.dtos";

// import type {
//   PaginatedResponseDto,
//   PaginationMeta,
// } from "../../dtos/pagination-response.dtos";

// export async function getApplicationsService(
//   query: ListApplicationsQueryDto
// ): Promise<
//   PaginatedResponseDto<
//     ReturnType<typeof toApplicationResponseDto>
//   >
// > {
//   const {
//     page = 1,
//     limit = 10,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = query;

//   const filter =
//     toApplicationFilter(query);

//   const allowedSortFields = [
//     "firstName",
//     "lastName",
//     "email",
//     "phone",
//     "status",
//     "admissionSession",
//     "admissionIntake",
//     "createdAt",
//     "updatedAt",
//   ];

//   const safeSortBy =
//     allowedSortFields.includes(sortBy)
//       ? sortBy
//       : "createdAt";

//   const sort: Record<
//     string,
//     1 | -1
//   > = {
//     [safeSortBy]:
//       sortOrder === "desc"
//         ? -1
//         : 1,
//   };

//   const skip = (page - 1) * limit;

//   const [
//     applications,
//     totalItems,
//   ] = await Promise.all([
//     ApplicationModel.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit),

//     ApplicationModel.countDocuments(
//       filter
//     ),
//   ]);

//   const totalPages = Math.ceil(
//     totalItems / limit
//   );

//   const pagination: PaginationMeta = {
//     page,
//     limit,
//     totalItems,
//     totalPages,
//     hasNextPage:
//       page < totalPages,
//     hasPreviousPage:
//       page > 1,
//   };

//   return {
//     items: applications.map(
//       toApplicationResponseDto
//     ),

//     pagination,
//   };
// }


// import ApplicationModel from "../../models/application.model";

// import {
//   toApplicationFilter,
//   toPaginatedApplicationsDto,
// } from "../../mapper/applicaiton.mapper";


// import type {
//   ListApplicationsQueryDto,
// } from "../../dtos/application.dtos";

// export async function getApplicationsService(
//   query: ListApplicationsQueryDto
// ): Promise<
//   ReturnType<
//     typeof toPaginatedApplicationsDto
//   >
// > {
//   const {
//     page = 1,
//     limit = 10,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = query;

//   const filter =
//     toApplicationFilter(query);

//   const allowedSortFields = [
//     "createdAt",
//     "updatedAt",
//     "firstName",
//     "lastName",
//     "email",
//     "status",
//     "admissionSession",
//     "admissionIntake",
//   ];

//   const safeSortBy =
//     allowedSortFields.includes(
//       sortBy
//     )
//       ? sortBy
//       : "createdAt";

//   const sort: Record<
//     string,
//     1 | -1
//   > = {
//     [safeSortBy]:
//       sortOrder === "desc"
//         ? -1
//         : 1,
//   };

//   const skip =
//     (page - 1) * limit;

//   const [
//     applications,
//     total,
//   ] = await Promise.all([
//     ApplicationModel.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit),

//     ApplicationModel.countDocuments(
//       filter
//     ),
//   ]);

//   return toPaginatedApplicationsDto(
//     applications,
//     total,
//     page,
//     limit
//   );
// }



import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";

import {
  toApplicationFilter,
  toApplicationResponseDto,
  toPaginatedApplicationsDto,
} from "../../mapper/applicaiton.mapper";

import type {
  ApplicationWithPopulatedProgram,
} from "../../mapper/applicaiton.mapper";

import type {
  ListApplicationsQueryDto,
} from "../../dtos/application.dtos";

/*
|--------------------------------------------------------------------------
| Get Applications
|--------------------------------------------------------------------------
*/

export async function getApplicationsService(
  query: ListApplicationsQueryDto
): Promise<
  ReturnType<
    typeof toPaginatedApplicationsDto
  >
> {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  /*
  |--------------------------------------------------------------------------
  | Build Filter
  |--------------------------------------------------------------------------
  */

  const filter =
    toApplicationFilter(query);

  /*
  |--------------------------------------------------------------------------
  | Allowed Sort Fields
  |--------------------------------------------------------------------------
  */

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "firstName",
    "lastName",
    "email",
    "phone",
    "status",
    "admissionSession",
    "admissionIntake",
  ];

  const safeSortBy =
    allowedSortFields.includes(
      sortBy
    )
      ? sortBy
      : "createdAt";

  /*
  |--------------------------------------------------------------------------
  | Sort
  |--------------------------------------------------------------------------
  */

  const sort: Record<
    string,
    1 | -1
  > = {
    [safeSortBy]:
      sortOrder === "desc"
        ? -1
        : 1,
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const skip =
    (page - 1) * limit;

  /*
  |--------------------------------------------------------------------------
  | Query Applications
  |--------------------------------------------------------------------------
  |
  | Program is populated here so the mapper receives:
  |
  | {
  |   _id,
  |   mnemonic,
  |   name
  | }
  |
  |--------------------------------------------------------------------------
  */

  const [
    applications,
    total,
  ] = await Promise.all([
    ApplicationModel.find(filter)
      .populate<{
        program: ApplicationWithPopulatedProgram["program"];
      }>({
        path: "program",
        select: "_id mnemonic name",
      })
      .sort(sort)
      .skip(skip)
      .limit(limit),

    ApplicationModel.countDocuments(
      filter
    ),
  ]);

  /*
  |--------------------------------------------------------------------------
  | Map Response
  |--------------------------------------------------------------------------
  */

  return toPaginatedApplicationsDto(
    applications as unknown as ApplicationWithPopulatedProgram[],
    total,
    page,
    limit
  );
}

/*
|--------------------------------------------------------------------------
| Get Single Application
|--------------------------------------------------------------------------
*/

export async function getApplicationService(
  id: string
): Promise<
  ReturnType<
    typeof toApplicationResponseDto
  >
> {
  /*
  |--------------------------------------------------------------------------
  | Find Application
  |--------------------------------------------------------------------------
  */

  const application =
    await ApplicationModel.findById(
      id
    ).populate<{
      program: ApplicationWithPopulatedProgram["program"];
    }>({
      path: "program",
      select: "_id mnemonic name",
    });

  /*
  |--------------------------------------------------------------------------
  | Not Found
  |--------------------------------------------------------------------------
  */

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Map Response
  |--------------------------------------------------------------------------
  */

  return toApplicationResponseDto(
    application as unknown as ApplicationWithPopulatedProgram
  );
}