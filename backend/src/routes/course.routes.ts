import { Router } from "express";

import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";

import { validateDto } from "../middleware/validate.middleware";
import { validateParamsDto } from "../middleware/validate-params.middleware";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { validateQueryDto } from "../middleware/validate-query.middleware";
import { CourseQueryDto } from "../dtos/course-query.dtos";
import {
  CreateCourseDto,
  UpdateCourseDto,
  CourseIdParamDto,
} from "../dtos/course.dtos";
import {
  uploadCourseFeeStructure,
} from "../controllers/course-upload.controller";

import {
  uploadCourseFeeStructure as uploadCourseFeeStructureMiddleware,
} from "../middleware/course-upload.middleware";

const router = Router();
router.get(
  "/",
  validateQueryDto(CourseQueryDto),
  asyncHandler(getCourses)
);
router.post(
  "/upload-fee-structure",
  authenticate,
  authorize("admin", "superadmin"),
  uploadCourseFeeStructureMiddleware,
  asyncHandler(uploadCourseFeeStructure)
);
router.get(
  "/:id",
  validateParamsDto(CourseIdParamDto),
  asyncHandler(getCourse)
);

router.post(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  validateDto(CreateCourseDto),
  asyncHandler(createCourse)
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(CourseIdParamDto),
  validateDto(UpdateCourseDto),
  asyncHandler(updateCourse)
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(CourseIdParamDto),
  asyncHandler(deleteCourse)
);

export default router;