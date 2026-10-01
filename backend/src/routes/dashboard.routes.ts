// import { Router } from "express";

// import {
//   getDashboard,
// } from "../controllers/dashboard.controller";

// import { asyncHandler } from "../middleware/async-handler.middleware.ts";

// import {
//   authenticate,
// } from "../middleware/authenticate.middleware";

// import {
//   authorize,
// } from "../middleware/authorize.middleware";

// const router = Router();

// router.get(
//   "/",
//   authenticate,
//   authorize("user","admin", "superadmin"),
//   asyncHandler(getDashboard)
// );

// export default router;import { Router } from "express";

import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { asyncHandler } from "../middleware/async-handler.middleware.ts";
import { authenticate } from "../middleware/authenticate.middleware";
import { authorize } from "../middleware/authorize.middleware";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("user", "admin", "superadmin"),
  asyncHandler(getDashboard)
);

export default router;