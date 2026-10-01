// import type { Request, Response } from "express";

// import {
//   getPublicCourseDetails,
//   getPublicProgramCatalog,
// } from "../services/public-program-catalog.service";

// import type { PublicCourseDetailsParamsDto, PublicProgramCatalogQueryDto } from "../dtos/public-program-catalog.dtos";

// export const getPublicProgramCatalogController = async (
//   req: Request,
//   res: Response,
// ) => {
//   const result = await getPublicProgramCatalog(
//     req.query as unknown as PublicProgramCatalogQueryDto,
//   );

//   return res.apiSuccess(
//     result,
//     "Program catalog retrieved successfully",
//   );
// };

// // export const getPublicCourseDetailsController = async (
// //   req: Request,
// //   res: Response,
// // ) => {
// //   const result = await getPublicCourseDetails(
// //     req.params.id,
// //   );

// //   return res.apiSuccess(
// //     result,
// //     "Course details retrieved successfully",
// //   );
// // };


// export const getPublicCourseDetailsController = async (
//   req: Request,
//   res: Response,
// ) => {
//   const result = await getPublicCourseDetails(req.params.id);

//   return res.apiSuccess(
//     result,
//     "Course details retrieved successfully",
//   );
// };

import type { Request, Response } from "express";

import {
  getPublicCourseDetails,
  getPublicProgramCatalog,
} from "../services/public-program-catalog.service";

import { AppError } from "../errors/app.error";

import type {
  PublicProgramCatalogQueryDto,
} from "../dtos/public-program-catalog.dtos";

export const getPublicProgramCatalogController = async (
  req: Request,
  res: Response,
) => {
  const result = await getPublicProgramCatalog(
    req.query as unknown as PublicProgramCatalogQueryDto,
  );

  return res.apiSuccess(
    result,
    "Program catalog retrieved successfully",
  );
};

export const getPublicCourseDetailsController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new AppError(
      "Invalid course id",
      400,
      "INVALID_COURSE_ID",
    );
  }

  const result = await getPublicCourseDetails(id);

  return res.apiSuccess(
    result,
    "Course details retrieved successfully",
  );
};