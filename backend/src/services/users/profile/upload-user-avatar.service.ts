
import UserModel from "../../../models/user.model";

import type { UserProfileResponseDto } from "../../../dtos/user-profile.dtos";

import { AppError } from "../../../errors/app.error";

import { toUserProfileResponseDto } from "../../../mapper/user-profile.mapper";
import { cloudinaryService } from "../../../configservices/cloudinary.service";



export const uploadUserAvatarService = async (
  userId: string,
  buffer: Buffer,
): Promise<UserProfileResponseDto> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND",
    );
  }

  const previousPublicId = user.avatar?.public_id;

  let uploadedAvatar:
    | {
        public_id: string;
        secure_url: string;
      }
    | undefined;

  try {
    uploadedAvatar = await cloudinaryService.uploadImage(
      buffer,
      `college-admission/users/${userId}/avatar`,
    );

    user.avatar = {
      public_id: uploadedAvatar.public_id,
      url: uploadedAvatar.secure_url,
    };

    await user.save();
  } catch (error: unknown) {
    if (uploadedAvatar?.public_id) {
      try {
        await cloudinaryService.deleteAsset(
          uploadedAvatar.public_id,
          "image",
        );
      } catch {
        // Do not hide the original upload/database error.
      }
    }

    throw error;
  }

  if (
    previousPublicId &&
    previousPublicId !== uploadedAvatar.public_id
  ) {
    try {
      await cloudinaryService.deleteAsset(
        previousPublicId,
        "image",
      );
    } catch {
      // The new avatar is already persisted.
      // Failure to remove the old asset should not fail the request.
    }
  }

  return toUserProfileResponseDto(user);
};