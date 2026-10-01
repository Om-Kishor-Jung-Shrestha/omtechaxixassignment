import { Router } from "express";
import { validateQueryDto } from "../middleware/validate-query.middleware";
import { ProgramQueryDto } from "../dtos/program-query.dtos";

import {
  createProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller";

import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { validateDto } from "../middleware/validate.middleware";
import { validateParamsDto } from "../middleware/validate-params.middleware";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";

import {
  CreateProgramDto,
  UpdateProgramDto,
  ProgramIdParamDto,
} from "../dtos/program.dtos";

const router = Router();

router.get(
  "/",
  validateQueryDto(ProgramQueryDto),
  asyncHandler(getPrograms)
);

router.get(
  "/:id",
  validateParamsDto(ProgramIdParamDto),
  asyncHandler(getProgram)
);

router.post(
  "/",
  authenticate,
  authorize("admin", "superadmin"),
  validateDto(CreateProgramDto),
  asyncHandler(createProgram)
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(ProgramIdParamDto),
  validateDto(UpdateProgramDto),
  asyncHandler(updateProgram)
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "superadmin"),
  validateParamsDto(ProgramIdParamDto),
  asyncHandler(deleteProgram)
);

export default router;