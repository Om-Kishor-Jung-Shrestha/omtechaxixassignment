// import { Router } from "express";

// import {
//   createApplication,
//   getApplications,
//   getApplication,
//   updateApplication,
//   updateApplicationStatus,
//   deleteApplication,
// } from "../controllers/application.controller";

// // import { asyncHandler } from "../middleware/async-handler.middleware";
// import { asyncHandler } from "../middleware/async-handler.middleware.ts";

// import { authenticate } from "../middleware/authenticate.middleware";
// import { authorize } from "../middleware/authorize.middleware";

// import { validateDto } from "../middleware/validate.middleware";
// import { validateParamsDto } from "../middleware/validate-params.middleware";
// import { validateQueryDto } from "../middleware/validate-query.middleware";

// import {
//   CreateApplicationDto,
//   UpdateApplicationDto,
//   UpdateStatusDto,
//   ListApplicationsQueryDto,
//   ApplicationIdParamDto,
// } from "../dtos/application.dtos";

// import {
//   uploadApplicationFiles,
// } from "../middleware/application-upload.middleware";

// const router = Router();

// /**
//  * Submit application
//  *
//  * POST /api/v1/applications
//  *
//  * Multipart form:
//  * - applicantImage
//  * - citizenship
//  * - cover
//  * - characterCertificate
//  * - document
//  * - marksheet12
//  */
// router.post(
//   "/",
//   authenticate,
//   uploadApplicationFiles,
//   validateDto(CreateApplicationDto),
//   asyncHandler(createApplication)
// );

// /**
//  * Get applications
//  *
//  * GET /api/v1/applications
//  *
//  * Admin / Superadmin only.
//  */
// router.get(
//   "/",
//   authenticate,
//   authorize("admin", "superadmin"),
//   validateQueryDto(
//     ListApplicationsQueryDto
//   ),
//   asyncHandler(getApplications)
// );

// /**
//  * Get single application
//  *
//  * GET /api/v1/applications/:id
//  *
//  * Admin / Superadmin only.
//  */
// router.get(
//   "/:id",
//   authenticate,
//   authorize("admin", "superadmin"),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   asyncHandler(getApplication)
// );

// /**
//  * Update application
//  *
//  * PATCH /api/v1/applications/:id
//  *
//  * Admin / Superadmin only.
//  */
// router.patch(
//   "/:id",
//   authenticate,
//   authorize("admin", "superadmin"),
//   uploadApplicationFiles,
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   validateDto(UpdateApplicationDto),
//   asyncHandler(updateApplication)
// );

// /**
//  * Update application status
//  *
//  * PATCH /api/v1/applications/:id/status
//  *
//  * Admin / Superadmin only.
//  */
// router.patch(
//   "/:id/status",
//   authenticate,
//   authorize("admin", "superadmin"),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   validateDto(UpdateStatusDto),
//   asyncHandler(updateApplicationStatus)
// );

// /**
//  * Delete application
//  *
//  * DELETE /api/v1/applications/:id
//  *
//  * Superadmin only.
//  */
// router.delete(
//   "/:id",
//   authenticate,
//   authorize("superadmin"),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   asyncHandler(deleteApplication)
// );

// export default router;

// import { Router } from "express";

// import {
//   createApplication,
//   getApplications,
//   getApplication,
//   updateApplication,
//   updateApplicationStatus,
//   deleteApplication,
//   getApplicationFile,
// } from "../controllers/application.controller";

// // import {
// //   asyncHandler,
// // } from "../middleware/async-handler.middleware";

// import {
//   authenticate,
// } from "../middleware/authenticate.middleware";

// import {
//   authorize,
// } from "../middleware/authorize.middleware";

// import {
//   validateDto,
// } from "../middleware/validate.middleware";

// import {
//   validateParamsDto,
// } from "../middleware/validate-params.middleware";

// import {
//   validateQueryDto,
// } from "../middleware/validate-query.middleware";

// import {
//   CreateApplicationDto,
//   UpdateApplicationDto,
//   UpdateStatusDto,
//   ListApplicationsQueryDto,
//   ApplicationIdParamDto,
// } from "../dtos/application.dtos";

// import {
//   uploadApplicationFiles,
// } from "../middleware/application-upload.middleware";
// import { asyncHandler } from "../middleware/async-handler.middleware.ts";

// const router = Router();

// /*
//  * ------------------------------------------------------
//  * Create application
//  * ------------------------------------------------------
//  */

// router.post(
//   "/",
//   authenticate,
//   uploadApplicationFiles,
//   validateDto(
//     CreateApplicationDto
//   ),
//   asyncHandler(
//     createApplication
//   )
// );

// /*
//  * ------------------------------------------------------
//  * Application list
//  * ------------------------------------------------------
//  */

// router.get(
//   "/",
//   authenticate,
//   authorize(
//     "admin",
//     "superadmin"
//   ),
//   validateQueryDto(
//     ListApplicationsQueryDto
//   ),
//   asyncHandler(
//     getApplications
//   )
// );

// /*
//  * ------------------------------------------------------
//  * Protected local application files
//  *
//  * Must be registered before /:id.
//  * ------------------------------------------------------
//  */

// router.get(
//   "/:id/files/:field",
//   authenticate,
//   authorize(
//     "admin",
//     "superadmin"
//   ),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   getApplicationFile
// );

// /*
//  * ------------------------------------------------------
//  * Single application
//  * ------------------------------------------------------
//  */

// router.get(
//   "/:id",
//   authenticate,
//   authorize(
//     "admin",
//     "superadmin"
//   ),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   asyncHandler(
//     getApplication
//   )
// );

// /*
//  * ------------------------------------------------------
//  * Update application
//  * ------------------------------------------------------
//  */

// router.patch(
//   "/:id",
//   authenticate,
//   authorize(
//     "admin",
//     "superadmin"
//   ),
//   uploadApplicationFiles,
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   validateDto(
//     UpdateApplicationDto
//   ),
//   asyncHandler(
//     updateApplication
//   )
// );

// /*
//  * ------------------------------------------------------
//  * Update application status
//  * ------------------------------------------------------
//  */

// router.patch(
//   "/:id/status",
//   authenticate,
//   authorize(
//     "admin",
//     "superadmin"
//   ),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   validateDto(
//     UpdateStatusDto
//   ),
//   asyncHandler(
//     updateApplicationStatus
//   )
// );

// /*
//  * ------------------------------------------------------
//  * Delete application
//  * ------------------------------------------------------
//  */

// router.delete(
//   "/:id",
//   authenticate,
//   authorize(
//     "superadmin"
//   ),
//   validateParamsDto(
//     ApplicationIdParamDto
//   ),
//   asyncHandler(
//     deleteApplication
//   )
// );

// export default router;



import { Router } from "express";

import {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
  getApplicationFile,
} from "../controllers/application.controller";

import {
  authenticate,
} from "../middleware/authenticate.middleware";

import {
  authorize,
} from "../middleware/authorize.middleware";

import {
  validateDto,
} from "../middleware/validate.middleware";

import {
  validateParamsDto,
} from "../middleware/validate-params.middleware";

import {
  validateQueryDto,
} from "../middleware/validate-query.middleware";

import {
  CreateApplicationDto,
  UpdateApplicationDto,
  UpdateStatusDto,
  ListApplicationsQueryDto,
  ApplicationIdParamDto,
   ApplicationFileParamDto,
} from "../dtos/application.dtos";

import {
  uploadApplicationFiles,
} from "../middleware/application-upload.middleware";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";

// import {
//   asyncHandler,
// } from "../middleware/async-handler.middleware";

const router = Router();

/*
 * ------------------------------------------------------
 * Create application
 *
 * PUBLIC
 *
 * Anyone can submit an admission application.
 * No authentication is required.
 * ------------------------------------------------------
 */

router.post(
  "/",
  uploadApplicationFiles,
  validateDto(CreateApplicationDto),
  asyncHandler(createApplication)
);

/*
 * ------------------------------------------------------
 * Application list
 *
 * AUTHENTICATED STAFF
 *
 * user         -> Admission Counselor
 * admin        -> Administrator
 * superadmin   -> Super Administrator
 * ------------------------------------------------------
 */

router.get(
  "/",
  authenticate,
  authorize(
    "user",
    "admin",
    "superadmin"
  ),
  validateQueryDto(ListApplicationsQueryDto),
  asyncHandler(getApplications)
);

/*
 * ------------------------------------------------------
 * Protected application files
 *
 * Must be registered before /:id.
 *
 * AUTHENTICATED STAFF
 * ------------------------------------------------------
 */

// router.get(
//   "/:id/files/:field",
//   authenticate,
//   authorize(
//     "user",
//     "admin",
//     "superadmin"
//   ),
//   validateParamsDto(ApplicationIdParamDto),
//   getApplicationFile
// );

router.get(
  "/:id/files/:field",
  authenticate,
  authorize("user", "admin", "superadmin"),
  validateParamsDto(ApplicationFileParamDto),
  getApplicationFile
);
/*
 * ------------------------------------------------------
 * Single application
 *
 * AUTHENTICATED STAFF
 * ------------------------------------------------------
 */

router.get(
  "/:id",
  authenticate,
  authorize(
    "user",
    "admin",
    "superadmin"
  ),
  validateParamsDto(ApplicationIdParamDto),
  asyncHandler(getApplication)
);

/*
 * ------------------------------------------------------
 * Update application
 *
 * AUTHENTICATED STAFF
 *
 * Counselor/admin/superadmin can update application
 * information while reviewing it.
 * ------------------------------------------------------
 */

router.patch(
  "/:id",
  authenticate,
  authorize(
    "user",
    "admin",
    "superadmin"
  ),
  uploadApplicationFiles,
  validateParamsDto(ApplicationIdParamDto),
  validateDto(UpdateApplicationDto),
  asyncHandler(updateApplication)
);

/*
 * ------------------------------------------------------
 * Update application status
 *
 * AUTHENTICATED STAFF
 *
 * Counselor/admin/superadmin can:
 *
 * pending
 * under_review
 * approved
 * rejected
 * ------------------------------------------------------
 */

router.patch(
  "/:id/status",
  authenticate,
  authorize(
    "user",
    "admin",
    "superadmin"
  ),
  validateParamsDto(ApplicationIdParamDto),
  validateDto(UpdateStatusDto),
  asyncHandler(updateApplicationStatus)
);

/*
 * ------------------------------------------------------
 * Delete application
 *
 * SUPERADMIN ONLY
 * ------------------------------------------------------
 */

router.delete(
  "/:id",
  authenticate,
  authorize("admin","superadmin"),
  validateParamsDto(ApplicationIdParamDto),
  asyncHandler(deleteApplication)
);

export default router;