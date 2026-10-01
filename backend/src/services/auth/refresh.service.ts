import UserModel from "../../models/user.model";
import { getRedisClient } from "../../config/redis";
import { JwtUtils } from "../../utils/jwt.utils";
// import { toUserResponseDto } from "../../mappers/user.mapper";
import { AppError } from "../../errors/app.error";
import { toUserResponseDto } from "../../mapper/user.mapper";

const REFRESH_TOKEN_BLACKLIST_PREFIX =
  "refreshtoken:blacklist:";

export interface RefreshServiceResult {
  userId: string;
  user: ReturnType<typeof toUserResponseDto>;
}

export async function refreshService(
  refreshToken?: string
): Promise<RefreshServiceResult> {
  if (!refreshToken) {
    throw new AppError(
      "Refresh token is required",
      401,
      "REFRESH_TOKEN_REQUIRED"
    );
  }

  const redis = getRedisClient();

  const blacklisted = await redis.get(
    `${REFRESH_TOKEN_BLACKLIST_PREFIX}${refreshToken}`
  );

  if (blacklisted) {
    throw new AppError(
      "Refresh token has been revoked",
      401,
      "REFRESH_TOKEN_REVOKED"
    );
  }

  const payload =
    JwtUtils.verifyRefreshToken(
      refreshToken
    );

  const user = await UserModel.findById(
    payload.id
  );

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  if (user.status === "deactivated") {
    throw new AppError(
      "Account deactivated",
      403,
      "ACCOUNT_DEACTIVATED"
    );
  }

  return {
    userId: user._id.toString(),
    user: toUserResponseDto(user),
  };
}