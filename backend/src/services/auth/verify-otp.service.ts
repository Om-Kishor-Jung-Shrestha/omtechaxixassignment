import UserModel from "../../models/user.model";
import { getRedisClient } from "../../config/redis";
// import { JwtUtils } from "../../utils/jwt.utils";
// import { toUserResponseDto } from "../../mappers/user.mapper";
import { AppError } from "../../errors/app.error";
import { toUserResponseDto } from "../../mapper/user.mapper";

export interface VerifyOtpServiceInput {
  email: string;
  otp: string;
}

export interface VerifyOtpServiceResult {
  user: ReturnType<typeof toUserResponseDto>;
}

interface RegistrationOtpData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
}

export async function verifyOtpService(
  input: VerifyOtpServiceInput
): Promise<VerifyOtpServiceResult> {
  const email = input.email.toLowerCase().trim();

  const redis = getRedisClient();

  const stored =
    await redis.get<RegistrationOtpData>(
      `otp:${email}`
    );

  if (!stored) {
    throw new AppError(
      "OTP has expired or does not exist",
      400,
      "OTP_EXPIRED"
    );
  }

  if (
    String(stored.otp) !==
    String(input.otp)
  ) {
    throw new AppError(
      "Invalid OTP",
      400,
      "INVALID_OTP"
    );
  }

  await redis.del(`otp:${email}`);

  const existingUser = await UserModel.findOne({
    email,
  });

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists",
      409,
      "EMAIL_ALREADY_EXISTS"
    );
  }

  const user = await UserModel.create({
    firstName: stored.firstName,
    middleName: stored.middleName,
    lastName: stored.lastName,
    email: stored.email,
    password: stored.password,
    isVerified: true,
    authProvider: "local",
    providerLinked: false,
  });

  return {
    user: toUserResponseDto(user),
  };
}