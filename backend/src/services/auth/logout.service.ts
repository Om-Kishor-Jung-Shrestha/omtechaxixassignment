import { getRedisClient } from "../../config/redis";

const REFRESH_TOKEN_BLACKLIST_PREFIX =
  "refreshtoken:blacklist:";

const REFRESH_TOKEN_TTL =
  3 * 24 * 60 * 60;

export async function logoutService(
  refreshToken?: string
): Promise<void> {
  if (!refreshToken) {
    return;
  }

  const redis = getRedisClient();

  await redis.set(
    `${REFRESH_TOKEN_BLACKLIST_PREFIX}${refreshToken}`,
    1,
    {
      ex: REFRESH_TOKEN_TTL,
    }
  );
}