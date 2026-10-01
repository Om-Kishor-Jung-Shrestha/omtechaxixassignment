// import {
//   ErrorRequestHandler,
//   Request,
//   Response,
//   NextFunction,
// } from "express";

// import mongoose from "mongoose";

// import { AppError } from "../errors/app.error";

// export const errorMiddleware: ErrorRequestHandler = (
//   error: unknown,
//   _req: Request,
//   res: Response,
//   _next: NextFunction
// ): void => {
//   console.error("❌ API Error:", error);

//   if (error instanceof AppError) {
//     res.apiError(
//       error.message,
//       error.statusCode,
//       error.code,
//       error.details
//     );

//     return;
//   }

//   if (error instanceof mongoose.Error.ValidationError) {
//     const details = Object.values(error.errors).map(
//       (validationError) => ({
//         field: validationError.path,
//         message: validationError.message,
//       })
//     );

//     res.apiError(
//       "Validation failed",
//       400,
//       "VALIDATION_ERROR",
//       details
//     );

//     return;
//   }

//   if (error instanceof mongoose.Error.CastError) {
//     res.apiError(
//       `Invalid value for ${error.path}`,
//       400,
//       "INVALID_VALUE"
//     );

//     return;
//   }

//   if (
//     error instanceof Error &&
//     error.name === "JsonWebTokenError"
//   ) {
//     res.apiError(
//       "Invalid authentication token",
//       401,
//       "INVALID_TOKEN"
//     );

//     return;
//   }

//   if (
//     error instanceof Error &&
//     error.name === "TokenExpiredError"
//   ) {
//     res.apiError(
//       "Authentication token has expired",
//       401,
//       "TOKEN_EXPIRED"
//     );

//     return;
//   }

//   if (
//     error instanceof Error &&
//     error.name === "MongoServerError" &&
//     "code" in error &&
//     error.code === 11000
//   ) {
//     res.apiError(
//       "A record with the same unique value already exists",
//       409,
//       "DUPLICATE_RESOURCE"
//     );

//     return;
//   }

//   res.apiError(
//     "Internal server error",
//     500,
//     "INTERNAL_SERVER_ERROR"
//   );
// };




import {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

import mongoose from "mongoose";

import { AppError } from "../errors/app.error";

export const errorMiddleware: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  void _next;

  console.error("❌ API Error:", error);

  if (error instanceof AppError) {
    res.apiError(
      error.message,
      error.statusCode,
      error.code,
      error.details
    );

    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map(
      (validationError) => ({
        field: validationError.path,
        message: validationError.message,
      })
    );

    res.apiError(
      "Validation failed",
      400,
      "VALIDATION_ERROR",
      details
    );

    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.apiError(
      `Invalid value for ${error.path}`,
      400,
      "INVALID_VALUE"
    );

    return;
  }

  if (
    error instanceof Error &&
    error.name === "JsonWebTokenError"
  ) {
    res.apiError(
      "Invalid authentication token",
      401,
      "INVALID_TOKEN"
    );

    return;
  }

  if (
    error instanceof Error &&
    error.name === "TokenExpiredError"
  ) {
    res.apiError(
      "Authentication token has expired",
      401,
      "TOKEN_EXPIRED"
    );

    return;
  }

  if (
    error instanceof Error &&
    error.name === "MongoServerError" &&
    "code" in error &&
    error.code === 11000
  ) {
    res.apiError(
      "A record with the same unique value already exists",
      409,
      "DUPLICATE_RESOURCE"
    );

    return;
  }

  res.apiError(
    "Internal server error",
    500,
    "INTERNAL_SERVER_ERROR"
  );
};
