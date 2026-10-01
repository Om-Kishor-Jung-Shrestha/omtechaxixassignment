import UserModel from "../../models/user.model";

import { getRedisClient } from "../../config/redis";

// import {
//   JwtUtils,
// } from "../../utils/jwt.utils";

// import {
//   toUserResponseDto,
// } from "../../mappers/user.mapper";


import { AppError } from "../../errors/app.error";
import { toUserResponseDto } from "../../mapper/user.mapper";

export interface AcceptInviteServiceInput {
  token: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
}

export interface AcceptInviteServiceResult {
  userId: string;
  user: ReturnType<typeof toUserResponseDto>;
}

interface InviteData {
  email: string;
  role?: "user" | "admin" | "superadmin";
}

export async function acceptInviteService(
  input: AcceptInviteServiceInput
): Promise<AcceptInviteServiceResult> {
  const redis = getRedisClient();

  const invite =
    await redis.get<InviteData>(
      `invite:${input.token}`
    );

  if (!invite) {
    throw new AppError(
      "Invalid or expired invitation",
      400,
      "INVALID_INVITE"
    );
  }

  const email =
    invite.email.toLowerCase().trim();

  const existingUser =
    await UserModel.findOne({
      email,
    });

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists",
      409,
      "EMAIL_ALREADY_EXISTS"
    );
  }

  const user =
    await UserModel.create({
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
      email,
      password: input.password,
      role: invite.role || "user",
      isVerified: true,
      authProvider: "local",
      providerLinked: false,
    });

  await redis.del(
    `invite:${input.token}`
  );

  return {
    userId: user._id.toString(),
    user: toUserResponseDto(user),
  };
}