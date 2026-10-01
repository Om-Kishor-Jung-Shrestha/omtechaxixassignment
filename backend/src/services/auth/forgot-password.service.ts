
import { getRedisClient } from "../../config/redis";
import { emailService } from "../../configservices/aemail.service";
import UserModel from "../../models/user.model";
import { generateOtp } from "../../utils/helper";

export interface ForgotPasswordServiceInput {
  email: string;
}

export async function forgotPasswordService(
  input: ForgotPasswordServiceInput
): Promise<void> {
  const email = input.email.toLowerCase().trim();

  const user = await UserModel.findOne({
    email,
  });

  /*
   * Deliberately return without revealing
   * whether the email exists.
   */
  if (!user) {
    return;
  }

  const otp = generateOtp();

  const redis = getRedisClient();

  await redis.set(
    `otp:reset:${email}`,
    {
      otp: String(otp),
    },
    {
      ex: 600,
    }
  );

  await emailService.sendOtp(
    email,
    otp
  );
}