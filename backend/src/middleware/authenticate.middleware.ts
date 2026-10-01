import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";
import { JwtUtils } from "../utils/jwt.utils";
import { AppError } from "../errors/app.error";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.access_token;

  if (!token) {
    next(
      new AppError(
        "Authentication required",
        401,
        "AUTHENTICATION_REQUIRED"
      )
    );
    return;
  }

  try {
    const payload = JwtUtils.verifyAccessToken(token);

    const user = await UserModel.findById(payload.id);

    if (!user) {
      next(
        new AppError(
          "User not found",
          401,
          "USER_NOT_FOUND"
        )
      );
      return;
    }

    if (user.status !== "active") {
      next(
        new AppError(
          "Your account is deactivated",
          403,
          "ACCOUNT_DEACTIVATED"
        )
      );
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}