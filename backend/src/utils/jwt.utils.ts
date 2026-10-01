import jwt, { SignOptions } from 'jsonwebtoken';
import { Response } from 'express';

const getAccessSecret  = () => process.env.ACCESS_TOKEN  ?? 'access_fallback_dev_secret';
const getRefreshSecret = () => process.env.REFRESH_TOKEN ?? 'refresh_fallback_dev_secret';

export interface TokenPayload { id: string; }

/**
 * Single source of truth for ALL JWT operations.
 * No jwt.sign / jwt.verify calls exist anywhere else in the codebase.
 */
export const JwtUtils = {

  signAccessToken(userId: string): string {
    return jwt.sign(
      { id: userId } satisfies TokenPayload,
      getAccessSecret(),
      { expiresIn: '15m' } as SignOptions
    );
  },

  signRefreshToken(userId: string): string {
    return jwt.sign(
      { id: userId } satisfies TokenPayload,
      getRefreshSecret(),
      { expiresIn: '3d' } as SignOptions
    );
  },

  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, getAccessSecret()) as TokenPayload;
  },

  verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, getRefreshSecret()) as TokenPayload;
  },

  decodeUnsafe(token: string): TokenPayload | null {
    return jwt.decode(token) as TokenPayload | null;
  },

  setCookies(res: Response, userId: string): void {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', JwtUtils.signAccessToken(userId), {
      httpOnly: true,
      sameSite: 'lax',
      secure:   isProd,
      maxAge:   15 * 60 * 1000,
    });
    res.cookie('refresh_token', JwtUtils.signRefreshToken(userId), {
      httpOnly: true,
      sameSite: 'lax',
      secure:   isProd,
      maxAge:   3 * 24 * 60 * 60 * 1000,
    });
  },

  clearCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  },
};