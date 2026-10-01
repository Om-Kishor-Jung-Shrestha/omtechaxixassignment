// import UserModel from "../../models/user.model";
// import {
//   toUserManagementResponseDto,
// } from "../../mapper/user.mapper";
// import type { UserQueryDto } from "../../dtos/user-query.dtos";
// import type {
//   PaginatedResponseDto,
//   PaginationMeta,
// } from "../../dtos/pagination-response.dtos";

// export async function getUsersService(
//   query: UserQueryDto
// ): Promise<
//   PaginatedResponseDto<
//     ReturnType<typeof toUserManagementResponseDto>
//   >
// > {
//   const {
//     page = 1,
//     limit = 10,
//     search,
//     role,
//     status,
//     authProvider,
//     isVerified,
//     courseId,
//     sortBy = "createdAt",
//     sortOrder = "desc",
//   } = query;

//   const filter: Record<string, unknown> = {};

//   if (search?.trim()) {
//     const searchRegex = new RegExp(
//       search.trim(),
//       "i"
//     );

//     filter.$or = [
//       { firstName: searchRegex },
//       { middleName: searchRegex },
//       { lastName: searchRegex },
//       { email: searchRegex },
//     ];
//   }

//   if (role !== undefined) {
//     filter.role = role;
//   }

//   if (status !== undefined) {
//     filter.status = status;
//   }

//   if (authProvider !== undefined) {
//     filter.authProvider = authProvider;
//   }

//   if (isVerified !== undefined) {
//     filter.isVerified = isVerified;
//   }

//   if (courseId !== undefined) {
//     filter["courses.courseId"] = courseId;
//   }

//   const allowedSortFields = [
//     "firstName",
//     "lastName",
//     "email",
//     "role",
//     "status",
//     "lastLogin",
//     "createdAt",
//     "updatedAt",
//   ];

//   const safeSortBy = allowedSortFields.includes(
//     sortBy
//   )
//     ? sortBy
//     : "createdAt";

//   const sort: Record<string, 1 | -1> = {
//     [safeSortBy]:
//       sortOrder === "desc" ? -1 : 1,
//   };

//   const skip = (page - 1) * limit;

//   const [users, totalItems] = await Promise.all([
//     UserModel.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit),

//     UserModel.countDocuments(filter),
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
//     items: users.map(
//       toUserManagementResponseDto
//     ),
//     pagination,
//   };
// }




import UserModel from "../../models/user.model";

import {
  toUserManagementResponseDto,
} from "../../mapper/user.mapper";

import type { UserQueryDto } from "../../dtos/user-query.dtos";

import type {
  PaginatedResponseDto,
  PaginationMeta,
} from "../../dtos/pagination-response.dtos";

import type { IUser } from "../../models/user.model";

export async function getUsersService(
  query: UserQueryDto,
  actorRole: IUser["role"]
): Promise<
  PaginatedResponseDto<
    ReturnType<typeof toUserManagementResponseDto>
  >
> {
  const {
    page = 1,
    limit = 10,
    search,
    role,
    status,
    authProvider,
    isVerified,
    courseId,
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
      { firstName: searchRegex },
      { middleName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
    ];
  }

  if (actorRole === "admin") {
    if (role === "superadmin") {
      filter.role = {
        $in: [],
      };
    } else if (role !== undefined) {
      filter.role = role;
    } else {
      filter.role = {
        $ne: "superadmin",
      };
    }
  } else if (role !== undefined) {
    filter.role = role;
  }

  if (status !== undefined) {
    filter.status = status;
  }

  if (authProvider !== undefined) {
    filter.authProvider = authProvider;
  }

  if (isVerified !== undefined) {
    filter.isVerified = isVerified;
  }

  if (courseId !== undefined) {
    filter["courses.courseId"] = courseId;
  }

  const allowedSortFields = [
    "firstName",
    "lastName",
    "email",
    "role",
    "status",
    "lastLogin",
    "createdAt",
    "updatedAt",
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

  const skip = (page - 1) * limit;

  const [users, totalItems] = await Promise.all([
    UserModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit),

    UserModel.countDocuments(filter),
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
    items: users.map(
      toUserManagementResponseDto
    ),
    pagination,
  };
}
