import multer from "multer";
import type {
  Request,
  Response,
  NextFunction,
} from "express";
import { AppError } from "../errors/app.error";

const courseFeeStructureUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback
  ): void => {
    const allowedTypes = new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ]);

    if (!allowedTypes.has(file.mimetype)) {
      callback(
        new Error(
          "Fee structure must be a JPEG, PNG, WebP, or PDF file"
        )
      );
      return;
    }

    callback(null, true);
  },
});

export function uploadCourseFeeStructure(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  courseFeeStructureUpload.single("file")(
    req,
    res,
    (error: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          next(
            new AppError(
              "File size cannot exceed 10 MB",
              400,
              "FILE_TOO_LARGE"
            )
          );
          return;
        }

        next(
          new AppError(
            error.message,
            400,
            "FILE_UPLOAD_ERROR"
          )
        );
        return;
      }

      if (error instanceof Error) {
        next(
          new AppError(
            error.message,
            400,
            "FILE_UPLOAD_ERROR"
          )
        );
        return;
      }

      next(
        new AppError(
          "File upload failed",
          400,
          "FILE_UPLOAD_ERROR"
        )
      );
    }
  );
}