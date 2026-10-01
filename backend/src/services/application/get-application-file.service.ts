import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";
import { ApplicationDocumentField } from "../../configservices/local-storage.service";

// import type {
//   ApplicationDocumentField,
// } from "../../config/local-storage.service";

const allowedFields =
  new Set<ApplicationDocumentField>([
    "citizenship",
    "cover",
    "characterCertificate",
    "document",
    "marksheet12",
  ]);

export function isApplicationDocumentField(
  field: string
): field is ApplicationDocumentField {
  return allowedFields.has(
    field as ApplicationDocumentField
  );
}

export async function getApplicationFileService(
  applicationId: string,
  field: string
): Promise<{
  path: string;
  format: string;
}> {
  if (
    !isApplicationDocumentField(field)
  ) {
    throw new AppError(
      "Invalid application document field",
      400,
      "INVALID_FILE_FIELD"
    );
  }

  const application =
    await ApplicationModel.findById(
      applicationId
    );

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  const resource =
    application.documents[field];

  if (!resource) {
    throw new AppError(
      "Application file not found",
      404,
      "APPLICATION_FILE_NOT_FOUND"
    );
  }

  if (
    resource.storage !== "local"
  ) {
    throw new AppError(
      "This application file is not stored locally",
      400,
      "INVALID_FILE_STORAGE"
    );
  }

  if (!resource.path) {
    throw new AppError(
      "Application file path is missing",
      404,
      "APPLICATION_FILE_PATH_MISSING"
    );
  }

  return {
    path: resource.path,
    format: resource.format,
  };
}