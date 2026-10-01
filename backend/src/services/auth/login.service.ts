import UserModel from "../../models/user.model";
// import { toUserResponseDto } from "../../mappers/user.mapper";
import { AppError } from "../../errors/app.error";
import { toUserResponseDto } from "../../mapper/user.mapper";

export interface LoginServiceInput {
  email: string;
  password: string;
}

export interface LoginServiceResult {
  user: ReturnType<typeof toUserResponseDto>;
  userId: string;
}

export async function loginService(
  input: LoginServiceInput
): Promise<LoginServiceResult> {
  const email = input.email.toLowerCase().trim();

  const user = await UserModel.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new AppError(
      "Invalid credentials",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  if (user.status === "deactivated") {
    throw new AppError(
      "Account deactivated",
      403,
      "ACCOUNT_DEACTIVATED"
    );
  }

  if (
    user.authProvider === "google" &&
    !user.providerLinked
  ) {
    throw new AppError(
      "Please log in with Google",
      403,
      "GOOGLE_LOGIN_REQUIRED"
    );
  }

  const validPassword =
    await user.comparePassword(
      input.password
    );

  if (!validPassword) {
    throw new AppError(
      "Invalid credentials",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  user.lastLogin = new Date();

  await user.save({
    validateBeforeSave: false,
  });

  return {
    user: toUserResponseDto(user),
    userId: user._id.toString(),
  };
}