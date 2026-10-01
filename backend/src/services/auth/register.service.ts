import UserModel from "../../models/user.model";
import { getRedisClient } from "../../config/redis";
import { AppError } from "../../errors/app.error";
import { generateOtp } from "../../utils/helper";
import { emailService } from "../../configservices/aemail.service";

export interface RegisterServiceInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegistrationOtpData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
}

export async function registerService(
  input: RegisterServiceInput
): Promise<void> {
  const email = input.email.toLowerCase().trim();

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

  const otp = generateOtp();

  const redis = getRedisClient();

  const otpData: RegistrationOtpData = {
    firstName: input.firstName,
    middleName: input.middleName,
    lastName: input.lastName,
    email,
    password: input.password,
    otp: String(otp),
  };

  await redis.set(
    `otp:${email}`,
    otpData,
    {
      ex: 600,
    }
  );

  await emailService.sendOtp(
    email,
    otp
  );
}