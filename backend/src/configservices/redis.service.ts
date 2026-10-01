import { getRedisClient } from '../config/redis';

export async function redisGet<T>(key: string): Promise<T | null> {
  try { return await getRedisClient().get<T>(key); } catch { return null; }
}
export async function redisSet(key: string, value: unknown, exSeconds?: number): Promise<void> {
  try {
    const redis = getRedisClient();
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    if (exSeconds) await redis.set(key, v, { ex: exSeconds });
    else await redis.set(key, v);
  } catch(e) { console.error('[Redis] SET error:', e); }
}


// export async function redisDel(key: string): Promise<void> {
//   try { await getRedisClient().del(key); } catch {}
// }
export async function redisDel(key: string): Promise<void> {
  try {
    await getRedisClient().del(key);
  } catch (error) {
    console.error("[Redis] DEL error:", error);
  }
}
export async function redisDelPattern(pattern: string): Promise<void> {
  try {
    const redis = getRedisClient();
    let cursor = 0;
    do {
      const result = await redis.scan(cursor, { match: pattern, count: 100 });
      cursor = Number(result[0]);
      const keys = result[1] as string[];
      if (keys.length) await Promise.all(keys.map((k: string) => redis.del(k)));
    } while (cursor !== 0);
  } catch(e) { console.error('[Redis] DEL pattern error:', e); }
}
export async function redisIncr(key: string): Promise<number> {
  try { return await getRedisClient().incr(key); } catch { return 0; }
}

// Object-style wrapper for controllers that import as { redisService }
export const redisService = {
  get: <T>(key: string) => redisGet<T>(key),
  set: (key: string, value: unknown, ex?: number) => redisSet(key, value, ex),
  del: (key: string) => redisDel(key),
  delPattern: (pattern: string) => redisDelPattern(pattern),
  incr: (key: string) => redisIncr(key),
};