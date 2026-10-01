import { Router } from "express";

import {
  getUsers,
  getUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";

// import { asyncHandler } from "../middleware/async-handler.middleware";
import { validateDto } from "../middleware/validate.middleware";
import { validateParamsDto } from "../middleware/validate-params.middleware";
import { validateQueryDto } from "../middleware/validate-query.middleware";

import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";

import { UserQueryDto } from "../dtos/user-query.dtos";
import { UpdateUserStatusDto } from "../dtos/update-user-status.dtos";
import { UpdateUserRoleDto } from "../dtos/update-user-role.dtos";
import { CourseIdParamDto } from "../dtos/course.dtos";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { UserIdParamDto } from "../dtos/user-param.dtos";

const router = Router();

/*
 * Admin + Superadmin
 */

router.get(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  validateQueryDto(UserQueryDto),
  asyncHandler(getUsers)
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(UserIdParamDto),
  asyncHandler(getUser)
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(CourseIdParamDto),
  validateDto(UpdateUserStatusDto),
  asyncHandler(updateUserStatus)
);

/*
 * Superadmin only
 */

router.patch(
  "/:id/role",
  authenticate,
  authorize("superadmin"),
  validateParamsDto(CourseIdParamDto),
  validateDto(UpdateUserRoleDto),
  asyncHandler(updateUserRole)
);

router.delete(
  "/:id",
  authenticate,
  authorize("superadmin"),
  validateParamsDto(CourseIdParamDto),
  asyncHandler(deleteUser)
);

export default router;