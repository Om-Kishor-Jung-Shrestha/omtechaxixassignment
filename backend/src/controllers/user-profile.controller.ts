import type { Request, Response } from "express";

import { getUserProfileService } from "../services/users/profile/get-user-profile.service";
import { updateUserProfileService } from "../services/users/profile/update-user-profile.service";
import { setUserPasswordService } from "../services/users/profile/set-user-password.service";
import { changeUserPasswordService } from "../services/users/profile/change-user-password.service";
import { uploadUserAvatarService } from "../services/users/profile/upload-user-avatar.service";

import type {
  UpdateUserProfileDto,
  SetUserPasswordDto,
  ChangeUserPasswordDto,
} from "../dtos/user-profile.dtos";

export async function getUserProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?._id?.toString();

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const profile = await getUserProfileService(userId);

  res.apiSuccess(
    profile,
    "Profile retrieved successfully"
  );
}

export async function updateUserProfile(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?._id?.toString();

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const profile = await updateUserProfileService(
    userId,
    req.body as UpdateUserProfileDto
  );

  res.apiSuccess(
    profile,
    "Profile updated successfully"
  );
}

export async function setUserPassword(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?._id?.toString();

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const profile = await setUserPasswordService(
    userId,
    req.body as SetUserPasswordDto
  );

  res.apiSuccess(
    profile,
    "Password set successfully"
  );
}

export async function changeUserPassword(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.user?._id?.toString();

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const profile = await changeUserPasswordService(
    userId,
    req.body as ChangeUserPasswordDto
  );

  res.apiSuccess(
    profile,
    "Password changed successfully"
  );
}

export async function uploadUserAvatar(req: Request, res: Response,): Promise<void>
{ const userId = req.user?._id?.toString();
  if (!userId) { res.status(401).json({ success: false, message: "Unauthorized", }); return; }
   if (!req.file) { res.status(400).json({ success: false, message: "Profile image is required", code: "PROFILE_IMAGE_REQUIRED", }); return; }
    const profile = await uploadUserAvatarService(userId, req.file.buffer,); res.apiSuccess(profile, "Profile image updated successfully",); }