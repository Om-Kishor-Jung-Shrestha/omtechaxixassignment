import UserModel from "../../../models/user.model";
// import { AppError } from "../../../utils/app-error";
// import { toUserProfileResponseDto } from "../../../mappers/user-profile.mapper";
import type {
  ChangeUserPasswordDto,
  UserProfileResponseDto,
} from "../../../dtos/user-profile.dtos";
import { AppError } from "../../../errors/app.error";
import { toUserProfileResponseDto } from "../../../mapper/user-profile.mapper";

export const changeUserPasswordService = async (
  userId: string,
  data: ChangeUserPasswordDto
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

  if (!user.password) {
    throw new AppError(
      "This account does not have a password. Use set password instead.",
      400,
      "PASSWORD_NOT_SET"
    );
  }

  const isCurrentPasswordValid =
    await user.comparePassword(data.currentPassword);

  if (!isCurrentPasswordValid) {
    throw new AppError(
      "Current password is incorrect",
      400,
      "INVALID_CURRENT_PASSWORD"
    );
  }

  user.password = data.newPassword;

  await user.save();

  return toUserProfileResponseDto(user);
};