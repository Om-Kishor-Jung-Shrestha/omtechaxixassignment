import crypto from 'node:crypto';
import { getRedisClient } from '../config/redis';
import { PaginationMeta } from '../types';

export function generateOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}
export async function storeOtp(key: string, otp: string, ttlSeconds = 600): Promise<void> {
  const redis = getRedisClient();
  await redis.set(key, otp, { ex: ttlSeconds });
}
export async function verifyOtp(key: string, otp: string): Promise<boolean> {
  const redis = getRedisClient();
  const stored = await redis.get<string>(key);
  return stored === otp;
}
export async function deleteOtp(key: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(key);
}
export function generateInviteToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; magA += a[i]*a[i]; magB += b[i]*b[i]; }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}
export function buildPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return { total, page, limit, totalPages, hasNextPage: page < totalPages, hasPrevPage: page > 1 };
}
export function getPaginationParams(query: Record<string, unknown>): { page: number; limit: number; skip: number } {
  const toPositiveInt = (value: unknown, fallback: number): number => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number.parseInt(value, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
    return fallback;
  };

  const page = Math.max(1, toPositiveInt(query.page, 1));
  const limit = Math.min(100, Math.max(1, toPositiveInt(query.limit, 10)));
  return { page, limit, skip: (page - 1) * limit };
}
export function transformYouTubeUrl(url: string): string {
  const regex = /(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const match = regex.exec(url);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
}

export function truncate(str: string, length = 80): string {
  return str.length <= length ? str : str.slice(0, length) + '...';
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date));
}

// export function generateSecureToken(bytes = 32): string {
//   const crypto = require('node:crypto');
//   return crypto.randomBytes(bytes).toString('hex');
// }

export function generateSecureToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}