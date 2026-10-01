import UserModel from "../../../models/user.model";

import type { UserProfileResponseDto } from "../../../dtos/user-profile.dtos";

import { AppError } from "../../../errors/app.error";

import { toUserProfileResponseDto } from "../../../mapper/user-profile.mapper";

export const getUserProfileService = async (
  userId: string,
): Promise<UserProfileResponseDto> => {
  const user = await UserModel.findById(userId).select("+password");

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND",
    );
  }

  return toUserProfileResponseDto(user);
};