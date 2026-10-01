import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Response {
      apiSuccess<T>(
        data?: T,
        message?: string,
        statusCode?: number
      ): void;

      apiError(
        message: string,
        statusCode?: number,
        code?: string,
        details?: unknown
      ): void;
    }
  }
}

export function responseMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.apiSuccess = <T>(
    data?: T,
    message = "Request successful",
    statusCode = 200
  ): void => {
    res.status(statusCode).json({
      success: true,
      message,
      data: data ?? null,
    });
  };

  res.apiError = (
    message: string,
    statusCode = 500,
    code?: string,
    details?: unknown
  ): void => {
    res.status(statusCode).json({
      success: false,
      message,
      ...(code ? { code } : {}),
      ...(details !== undefined ? { details } : {}),
    });
  };

  next();
}