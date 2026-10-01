import {
  plainToInstance,
} from "class-transformer";

import {
  validate,
  type ValidatorOptions,
} from "class-validator";

import {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../errors/app.error";

export const validateParamsDto = (
  dtoClass: new () => object,
  options?: ValidatorOptions
) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dto =
      plainToInstance(
        dtoClass,
        req.params
      );

    const errors = await validate(
      dto,
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        ...options,
      }
    );

    if (errors.length > 0) {
      const details = errors.map(
        (error) => ({
          field: error.property,
          messages: Object.values(
            error.constraints ?? {}
          ),
          children:
            error.children?.length
              ? error.children
              : undefined,
        })
      );

      next(
        new AppError(
          "Validation failed",
          400,
          "VALIDATION_ERROR",
          details
        )
      );

      return;
    }

    req.params = dto as Record<
      string,
      string
    >;

    next();
  };
};