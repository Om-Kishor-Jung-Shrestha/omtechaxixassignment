// import multer from "multer";
// import type { Request } from "express";

// const applicationUpload = multer({
//   storage: multer.memoryStorage(),

//   limits: {
//     fileSize: 10 * 1024 * 1024,
//     files: 6,
//   },

//   fileFilter: (
//     _req: Request,
//     file: Express.Multer.File,
//     callback
//   ): void => {
//     const allowedPdfFields = new Set([
//       "citizenship",
//       "cover",
//       "characterCertificate",
//       "document",
//       "marksheet12",
//     ]);

//     if (file.fieldname === "applicantImage") {
//       if (
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/webp"
//       ) {
//         callback(null, true);
//         return;
//       }

//       callback(
//         new Error(
//           "Applicant image must be JPEG, PNG, or WebP"
//         )
//       );
//       return;
//     }

//     if (allowedPdfFields.has(file.fieldname)) {
//       if (file.mimetype === "application/pdf") {
//         callback(null, true);
//         return;
//       }

//       callback(
//         new Error(
//           `${file.fieldname} must be a PDF file`
//         )
//       );
//       return;
//     }

//     callback(
//       new Error(
//         `Unexpected file field: ${file.fieldname}`
//       )
//     );
//   },
// });

// export const uploadApplicationFiles =
//   applicationUpload.fields([
//     {
//       name: "citizenship",
//       maxCount: 1,
//     },
//     {
//       name: "cover",
//       maxCount: 1,
//     },
//     {
//       name: "characterCertificate",
//       maxCount: 1,
//     },
//     {
//       name: "document",
//       maxCount: 1,
//     },
//     {
//       name: "marksheet12",
//       maxCount: 1,
//     },
//     {
//       name: "applicantImage",
//       maxCount: 1,
//     },
//   ]);

import multer from "multer";
import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { AppError } from "../errors/app.error";

const applicationUpload =
  multer({
    storage:
      multer.memoryStorage(),

    limits: {
      fileSize:
        10 * 1024 * 1024,

      files: 6,
    },

    fileFilter: (
      _req: Request,
      file: Express.Multer.File,
      callback
    ): void => {
      const allowedPdfFields =
        new Set([
          "citizenship",
          "cover",
          "characterCertificate",
          "document",
          "marksheet12",
        ]);

      if (
        file.fieldname ===
        "applicantImage"
      ) {
        if (
          file.mimetype ===
            "image/jpeg" ||
          file.mimetype ===
            "image/png" ||
          file.mimetype ===
            "image/webp"
        ) {
          callback(
            null,
            true
          );

          return;
        }

        callback(
          new Error(
            "Applicant image must be JPEG, PNG, or WebP"
          )
        );

        return;
      }

      if (
        allowedPdfFields.has(
          file.fieldname
        )
      ) {
        if (
          file.mimetype ===
          "application/pdf"
        ) {
          callback(
            null,
            true
          );

          return;
        }

        callback(
          new Error(
            `${file.fieldname} must be a PDF file`
          )
        );

        return;
      }

      callback(
        new Error(
          `Unexpected file field: ${file.fieldname}`
        )
      );
    },
  });

export function uploadApplicationFiles(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  applicationUpload.fields([
    {
      name: "citizenship",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "characterCertificate",
      maxCount: 1,
    },
    {
      name: "document",
      maxCount: 1,
    },
    {
      name: "marksheet12",
      maxCount: 1,
    },
    {
      name: "applicantImage",
      maxCount: 1,
    },
  ])(
    req,
    res,
    (error: unknown) => {
      if (!error) {
        next();
        return;
      }

      if (
        error instanceof
        multer.MulterError
      ) {
        if (
          error.code ===
          "LIMIT_FILE_SIZE"
        ) {
          next(
            new AppError(
              "File size cannot exceed 10 MB",
              400,
              "FILE_TOO_LARGE"
            )
          );

          return;
        }

        if (
          error.code ===
          "LIMIT_FILE_COUNT"
        ) {
          next(
            new AppError(
              "Too many files uploaded",
              400,
              "TOO_MANY_FILES"
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

      if (
        error instanceof Error
      ) {
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