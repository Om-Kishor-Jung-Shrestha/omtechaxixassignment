import { Router } from "express";

import {
  getUserProfile,
  updateUserProfile,
  setUserPassword,
  changeUserPassword,
  uploadUserAvatar,
} from "../controllers/user-profile.controller";

// import { authenticate } from "../middlewares/auth.middleware";
// import { validateDto } from "../middlewares/validate.middleware";
// import { asyncHandler } from "../utils/async-handler";

import {
  UpdateUserProfileDto,
  SetUserPasswordDto,
  ChangeUserPasswordDto,
} from "../dtos/user-profile.dtos";
import { authenticate } from "../middleware/authenticate.middleware";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { validateDto } from "../middleware/validate.middleware";
import { profileUpload } from "../middleware/profile-upload.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  asyncHandler(getUserProfile)
);

router.patch(
  "/",
  authenticate,
  validateDto(UpdateUserProfileDto),
  asyncHandler(updateUserProfile)
);

router.post(
  "/password/set",
  authenticate,
  validateDto(SetUserPasswordDto),
  asyncHandler(setUserPassword)
);

router.post(
  "/password/change",
  authenticate,
  validateDto(ChangeUserPasswordDto),
  asyncHandler(changeUserPassword)
);

router.post(
  "/avatar",
  authenticate,
  profileUpload.single("avatar"),
  asyncHandler(uploadUserAvatar),
);

export default router;