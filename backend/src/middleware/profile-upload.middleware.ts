
import multer from "multer";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback,
) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    callback(
      new Error(
        "Invalid profile image type. Only JPEG, PNG, and WEBP images are allowed.",
      ),
    );
    return;
  }

  callback(null, true);
};

export const profileUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_PROFILE_IMAGE_SIZE,
    files: 1,
  },
});
