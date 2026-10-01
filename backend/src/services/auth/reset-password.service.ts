import UserModel from "../../models/user.model";
import { getRedisClient } from "../../config/redis";
import { AppError } from "../../errors/app.error";

export interface ResetPasswordServiceInput {
  email: string;
  otp: string;
  newPassword: string;
}

interface ResetOtpData {
  otp: string;
}

export async function resetPasswordService(
  input: ResetPasswordServiceInput
): Promise<void> {
  const email = input.email.toLowerCase().trim();

  const redis = getRedisClient();

  const stored =
    await redis.get<ResetOtpData>(
      `otp:reset:${email}`
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

  const user =
    await UserModel.findOne({
      email,
    }).select("+password");

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  user.password = input.newPassword;

  await user.save();

  await redis.del(
    `otp:reset:${email}`
  );
}