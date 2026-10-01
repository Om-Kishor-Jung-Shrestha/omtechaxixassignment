import { Router } from "express";

// import { asyncHandler } from "../utils/async-handler";

// import {
//   getPublicCourseDetailsController,
//   getPublicProgramCatalogController,
// } from "../controllers/public-program-catalog.controller";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { getPublicCourseDetailsController, getPublicProgramCatalogController } from "../controllers/public-program-catalog.controller";

const router = Router();

/*
 * Guest catalog.
 *
 * IMPORTANT:
 * There is intentionally NO authenticate middleware here.
 */

/*
 * GET /api/v1/public/catalog/programs
 */
router.get(
  "/programs",
  asyncHandler(
    getPublicProgramCatalogController,
  ),
);

/*
 * GET /api/v1/public/catalog/programs/:id
 */
router.get(
  "/programs/:id",
  asyncHandler(
    getPublicCourseDetailsController,
  ),
);

export default router;