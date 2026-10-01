import { Redis } from "@upstash/redis";

const redisClient = (() => {
  let client: Redis | null = null;

  return (): Redis => {
    if (!client) {
      const url = process.env.UPSTASH_REDIS_URL;
      const token = process.env.UPSTASH_REDIS_TOKEN;

      if (!url || !token) {
        throw new Error(
          "UPSTASH_REDIS_URL and UPSTASH_REDIS_TOKEN must be set"
        );
      }

      client = new Redis({
        url,
        token,
      });
    }

    return client;
  };
})();

export function getRedisClient(): Redis {
  return redisClient();
}

export async function connectRedis(): Promise<void> {
  try {
    const client = getRedisClient();

    await client.ping();

    console.log("✅ Upstash Redis connected");
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
    throw error;
  }
}