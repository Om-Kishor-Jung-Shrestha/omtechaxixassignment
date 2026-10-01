// import ApplicationModel from "../../models/application.model";
// import { AppError } from "../../errors/app.error";

// export async function deleteApplicationService(
//   id: string
// ): Promise<void> {
//   const application =
//     await ApplicationModel.findById(id);

//   if (!application) {
//     throw new AppError(
//       "Application not found",
//       404,
//       "APPLICATION_NOT_FOUND"
//     );
//   }

//   await application.deleteOne();
// }

import ApplicationModel from "../../models/application.model";
import { AppError } from "../../errors/app.error";

import {
  removeApplicationFile,
} from "./application-file.service";

export async function deleteApplicationService(
  id: string
): Promise<void> {
  const application =
    await ApplicationModel.findById(
      id
    );

  if (!application) {
    throw new AppError(
      "Application not found",
      404,
      "APPLICATION_NOT_FOUND"
    );
  }

  /*
   * ------------------------------------------------------
   * Delete Cloudinary applicant image.
   * ------------------------------------------------------
   */

  try {
    await removeApplicationFile(
      application.applicantImage
    );
  } catch (error) {
    console.error(
      "Failed to delete applicant image:",
      error
    );
  }

  /*
   * ------------------------------------------------------
   * Delete local/remote application documents.
   * ------------------------------------------------------
   */

  const documentResources = [
    application.documents.citizenship,
    application.documents.cover,
    application.documents
      .characterCertificate,
    application.documents.document,
    application.documents.marksheet12,
  ];

  for (
    const resource of documentResources
  ) {
    try {
      await removeApplicationFile(
        resource
      );
    } catch (error) {
      console.error(
        "Failed to delete application document:",
        error
      );
    }
  }

  /*
   * ------------------------------------------------------
   * Delete MongoDB record.
   * ------------------------------------------------------
   */

  await application.deleteOne();
}