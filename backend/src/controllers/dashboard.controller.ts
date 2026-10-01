// import {
//   Request,
//   Response,
// } from "express";

// import {
//   getDashboardService,
// } from "../services/dashboard/get-dashboard.service";

// export async function getDashboard(
//   _req: Request,
//   res: Response
// ): Promise<void> {
//   const dashboard =
//     await getDashboardService();

//   res.apiSuccess(
//     dashboard,
//     "Dashboard retrieved successfully"
//   );
// }

import {
  Request,
  Response,
} from "express";

import {
  getDashboardService,
} from "../services/dashboard/get-dashboard.service";

import { AppError } from "../errors/app.error";

export async function getDashboard(
  req: Request,
  res: Response
): Promise<void> {
  if (!req.user) {
    throw new AppError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
  }

  const dashboard = await getDashboardService(
    req.user.role
  );

  res.apiSuccess(
    dashboard,
    "Dashboard retrieved successfully"
  );
}