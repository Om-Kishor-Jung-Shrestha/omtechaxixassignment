import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import UserModel from '../models/user.model';


// ── JWT Cookie Helper ─────────────────────────────────────────────────────────
function extractToken(req: Request): string | null {
  if (req.cookies?.access_token) return req.cookies.access_token;
  const auth = req.headers.authorization;
  if (auth?.startsWith('Bearer ')) return auth.split(' ')[1];
  return null;
}
// ── isAuthenticated ───────────────────────────────────────────────────────────

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractToken(req);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
    return;
  }

  try {
    const { id } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN || "fallback_secret"
    ) as { id: string };

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (user.status === "deactivated") {
      res.status(403).json({
        success: false,
        message:
          "Your account has been deactivated. Please contact support.",
      });
      return;
    }

    req.user = user;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

// ── isAdmin ───────────────────────────────────────────────────────────────────
// ── isAdmin ───────────────────────────────────────────────────────────────────

export function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { user } = req;

  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
    return;
  }

  next();
}

// ── isSuperAdmin ──────────────────────────────────────────────────────────────
export function isSuperAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { user } = req;

  if (user?.role !== "superadmin") {
    res.status(403).json({
      success: false,
      message: "SuperAdmin access required",
    });
    return;
  }

  next();
}

// // ── hasPurchased ──────────────────────────────────────────────────────────────
// export async function hasPurchased(req: Request, res: Response, next: NextFunction): Promise<void> {
//   if (!req.user) { res.status(401).json({ success: false, message: 'Not authenticated' }); return; }
//   if (req.user.role === 'admin' || req.user.role === 'superadmin') { next(); return; }

//   const courseId = req.params.courseId || req.params.id;
//   const owned = req.user.courses.some(c => c.courseId === courseId);
//   if (!owned) {
//     res.status(403).json({ success: false, message: 'You must purchase this course to access this content' });
//     return;
//   }
//   next();
// }

// ── Multer Upload ─────────────────────────────────────────────────────────────
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  // fileFilter: (_req, file, cb) => {
  //   const allowed = ['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/quicktime','video/x-msvideo','application/pdf'];
  //   allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error(`File type ${file.mimetype} not allowed`));
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "application/pdf",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

// ── Local disk storage for videos (saves to uploads/videos/) ──────────────────
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads', 'videos');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const localVideoStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

export const localVideoUpload = multer({
  storage: localVideoStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB local video cap to keep uploads safe and manageable
  // fileFilter: (_req, file, cb) => {
  //   const allowed = ['video/mp4','video/quicktime','video/x-msvideo','video/webm','video/mpeg'];
  //   allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only video files allowed'));
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
      "video/mpeg",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"));
    }
  },
});

// ── Rate Limiter ──────────────────────────────────────────────────────────────
// General rate limiter - generous for development, strict only for auth routes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,          // 15 minutes
  max: 2000,                          // 2000 requests per window (very generous)
  skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1', // skip localhost entirely
  message: { success: false, message: 'Too many requests, please slow down' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limiter only for auth endpoints (login, register, OTP)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,                            // 50 auth attempts per 15 min
  skip: (req) => req.ip === '127.0.0.1' || req.ip === '::1',
  message: { success: false, message: 'Too many authentication attempts, please wait 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});