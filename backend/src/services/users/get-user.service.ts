// import UserModel from "../../models/user.model";
// import { AppError } from "../../errors/app.error";
// import {
//   toUserManagementResponseDto,
// } from "../../mapper/user.mapper";

// export async function getUserService(
//   id: string
// ): Promise<
//   ReturnType<typeof toUserManagementResponseDto>
// > {
//   const user = await UserModel.findById(id);

//   if (!user) {
//     throw new AppError(
//       "User not found",
//       404,
//       "USER_NOT_FOUND"
//     );
//   }

//   return toUserManagementResponseDto(user);
// }


import UserModel from "../../models/user.model";

import { AppError } from "../../errors/app.error";

import {
  toUserManagementResponseDto,
} from "../../mapper/user.mapper";

import type { IUser } from "../../models/user.model";

export async function getUserService(
  id: string,
  actorRole: IUser["role"]
): Promise<
  ReturnType<typeof toUserManagementResponseDto>
> {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  if (
    actorRole === "admin" &&
    user.role === "superadmin"
  ) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  return toUserManagementResponseDto(user);
}