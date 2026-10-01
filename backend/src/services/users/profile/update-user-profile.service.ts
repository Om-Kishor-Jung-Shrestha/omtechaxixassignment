import UserModel from "../../../models/user.model";
// import { AppError } from "../../../utils/app-error";
// import { toUserProfileResponseDto } from "../../../mappers/user-profile.mapper";
import type {
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from "../../../dtos/user-profile.dtos";
import { AppError } from "../../../errors/app.error";
import { toUserProfileResponseDto } from "../../../mapper/user-profile.mapper";

export const updateUserProfileService = async (
  userId: string,
  data: UpdateUserProfileDto
): Promise<UserProfileResponseDto> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  const existingUser = await UserModel.findOne({
    email: data.email.toLowerCase(),
    _id: { $ne: userId },
  });

  if (existingUser) {
    throw new AppError(
      "Email is already in use",
      409,
      "EMAIL_ALREADY_EXISTS"
    );
  }

  user.firstName = data.firstName.trim();

  user.middleName = data.middleName?.trim() || "";

  user.lastName = data.lastName.trim();

  user.email = data.email.toLowerCase().trim();

  await user.save();

  return toUserProfileResponseDto(user);
};