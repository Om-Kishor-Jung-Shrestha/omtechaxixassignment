// import {
//   saveApplicationPdf,
//   deleteLocalFile,
//   type ApplicationDocumentField,
// } from "../../config/local-storage.service";

// import { cloudinaryService } from "../../config/cloudinary.service";

import { cloudinaryService } from "../../configservices/cloudinary.service";
import { ApplicationDocumentField, deleteLocalFile, saveApplicationPdf } from "../../configservices/local-storage.service";
import type {
  FileResource,
} from "../../types/file-resource";

const applicationPdfFields: ApplicationDocumentField[] = [
  "citizenship",
  "cover",
  "characterCertificate",
  "document",
  "marksheet12",
];

export function isApplicationPdfField(
  field: string
): field is ApplicationDocumentField {
  return applicationPdfFields.includes(
    field as ApplicationDocumentField
  );
}

export async function processApplicationFile(
  applicationId: string,
  field: string,
  file: Express.Multer.File
): Promise<FileResource> {
  if (field === "applicantImage") {
    const result =
      await cloudinaryService.uploadImage(
        file.buffer,
        `college-admission/applications/${applicationId}/applicant`
      );

    return {
      storage: "cloudinary",
      public_id: result.public_id,
      url: result.secure_url,
      resourceType: "image",
      format: file.mimetype.split("/")[1] ?? "jpg",
    };
  }

  if (isApplicationPdfField(field)) {
    const result =
      await saveApplicationPdf(
        applicationId,
        field,
        file.buffer
      );

    return {
      storage: "local",
      public_id: "",
      url: result.url,
      path: result.path,
      resourceType: "raw",
      format: "pdf",
    };
  }

  throw new Error(
    `Unsupported application file field: ${field}`
  );
}

export async function removeApplicationFile(
  resource: FileResource
): Promise<void> {
  if (resource.storage === "cloudinary") {
    if (resource.public_id) {
      await cloudinaryService.deleteAsset(
        resource.public_id,
        resource.resourceType
      );
    }

    return;
  }

  if (
    resource.storage === "local" &&
    resource.path
  ) {
    await deleteLocalFile(resource.path);
  }
}