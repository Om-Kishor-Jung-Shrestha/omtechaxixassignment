import UserModel from "../../../models/user.model";
// import { AppError } from "../../../utils/app-error";
// import { toUserProfileResponseDto } from "../../../mappers/user-profile.mapper";
import type {
  SetUserPasswordDto,
  UserProfileResponseDto,
} from "../../../dtos/user-profile.dtos";
import { AppError } from "../../../errors/app.error";
import { toUserProfileResponseDto } from "../../../mapper/user-profile.mapper";

export const setUserPasswordService = async (
  userId: string,
  data: SetUserPasswordDto
): Promise<UserProfileResponseDto> => {
  if (data.newPassword !== data.confirmPassword) {
    throw new AppError(
      "Passwords do not match",
      400,
      "PASSWORD_MISMATCH"
    );
  }

  const user = await UserModel.findById(userId).select("+password");

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  if (user.password) {
    throw new AppError(
      "Password already exists. Use change password instead.",
      400,
      "PASSWORD_ALREADY_EXISTS"
    );
  }

  user.password = data.newPassword;

  await user.save();

  return toUserProfileResponseDto(user);
};