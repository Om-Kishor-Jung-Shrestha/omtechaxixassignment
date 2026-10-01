import type { Request, Response } from "express";

import { cloudinaryService } from "../configservices/cloudinary.service";

export async function uploadCourseFeeStructure(
  req: Request,
  res: Response
): Promise<void> {
  const file = req.file;

  if (!file) {
    res.apiError(
      "Fee structure file is required",
      400,
      "FILE_REQUIRED"
    );
    return;
  }

  const isPdf =
    file.mimetype === "application/pdf";

  const resourceType = isPdf
    ? "raw"
    : "image";

  const result = isPdf
    ? await cloudinaryService.uploadRaw(
        file.buffer,
        "college-admission/courses/fee-structures"
      )
    : await cloudinaryService.uploadImage(
        file.buffer,
        "college-admission/courses/fee-structures"
      );

  const format =
    file.mimetype.split("/")[1] ??
    (isPdf ? "pdf" : "jpg");

  res.apiSuccess(
    {
      public_id: result.public_id,
      url: result.secure_url,
      resourceType,
      format,
    },
    "Fee structure uploaded successfully",
    201
  );
}