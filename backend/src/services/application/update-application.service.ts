// import ApplicationModel from "../../models/application.model";
// import ProgramModel from "../../models/program.model";

// import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
//   toApplicationUpdate,
// } from "../../mapper/applicaiton.mapper";

// import type { UpdateApplicationDto } from "../../dtos/application.dtos";

// export async function updateApplicationService(
//   id: string,
//   dto: UpdateApplicationDto
// ): Promise<
//   ReturnType<typeof toApplicationResponseDto>
// > {
//   const application =
//     await ApplicationModel.findById(id);

//   if (!application) {
//     throw new AppError(
//       "Application not found",
//       404,
//       "APPLICATION_NOT_FOUND"
//     );
//   }

//   if (dto.program !== undefined) {
//     const program =
//       await ProgramModel.findById(
//         dto.program
//       );

//     if (!program) {
//       throw new AppError(
//         "Program not found",
//         404,
//         "PROGRAM_NOT_FOUND"
//       );
//     }
//   }

//   const update =
//     toApplicationUpdate(dto);

//   Object.assign(
//     application,
//     update
//   );

//   await application.save();

//   return toApplicationResponseDto(
//     application
//   );
// }

import ApplicationModel from "../../models/application.model";
import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";

import {
  toApplicationResponseDto,
} from "../../mapper/applicaiton.mapper";

import type {
  UpdateApplicationDto,
} from "../../dtos/application.dtos";

import {
  processApplicationFile,
  removeApplicationFile,
} from "./application-file.service";

interface ApplicationUploadedFiles {
  citizenship?: Express.Multer.File[];
  cover?: Express.Multer.File[];
  characterCertificate?: Express.Multer.File[];
  document?: Express.Multer.File[];
  marksheet12?: Express.Multer.File[];
  applicantImage?: Express.Multer.File[];
}

export async function updateApplicationService(
  id: string,
  dto: UpdateApplicationDto,
  files: ApplicationUploadedFiles
): Promise<
  ReturnType<
    typeof toApplicationResponseDto
  >
> {
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
   * Verify program if it is being changed.
   * ------------------------------------------------------
   */

  if (dto.program !== undefined) {
    const program =
      await ProgramModel.findById(
        dto.program
      );

    if (!program) {
      throw new AppError(
        "Program not found",
        404,
        "PROGRAM_NOT_FOUND"
      );
    }

    application.program =
      program._id;
  }

  /*
   * ------------------------------------------------------
   * Normal fields
   * ------------------------------------------------------
   */

  if (dto.firstName !== undefined) {
    application.firstName =
      dto.firstName;
  }

  if (dto.middleName !== undefined) {
    application.middleName =
      dto.middleName;
  }

  if (dto.lastName !== undefined) {
    application.lastName =
      dto.lastName;
  }

  if (dto.email !== undefined) {
    application.email =
      dto.email;
  }

  if (dto.phone !== undefined) {
    application.phone =
      dto.phone;
  }

  if (
    dto.admissionSession !==
    undefined
  ) {
    application.admissionSession =
      dto.admissionSession;
  }

  if (
    dto.admissionIntake !==
    undefined
  ) {
    application.admissionIntake =
      dto.admissionIntake;
  }

  if (
    dto.academicQualification !==
    undefined
  ) {
    application.academicQualification =
      dto.academicQualification;
  }

  if (
    dto.academicHistory !==
    undefined
  ) {
    application.academicHistory = {
      collegeOrSchool:
        dto.academicHistory
          .collegeOrSchool,

      board:
        dto.academicHistory.board,

      gradeOrGpa:
        dto.academicHistory.gradeOrGpa,
    };
  }

  if (dto.address !== undefined) {
    application.address =
      dto.address;
  }

  /*
   * Status is intentionally not updated here.
   *
   * Status has its own endpoint:
   * PATCH /:id/status
   */

  const uploadedResources: Array<
    Awaited<
      ReturnType<
        typeof processApplicationFile
      >
    >
  > = [];

  const oldResources: Array<
    Awaited<
      ReturnType<
        typeof processApplicationFile
      >
    >
  > = [];

  try {
    /*
     * ----------------------------------------------------
     * Applicant image replacement
     * ----------------------------------------------------
     */

    const applicantImage =
      files.applicantImage?.[0];

    if (applicantImage) {
      const newResource =
        await processApplicationFile(
          id,
          "applicantImage",
          applicantImage
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.applicantImage
      );

      application.applicantImage =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * Citizenship replacement
     * ----------------------------------------------------
     */

    const citizenship =
      files.citizenship?.[0];

    if (citizenship) {
      const newResource =
        await processApplicationFile(
          id,
          "citizenship",
          citizenship
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.documents
          .citizenship
      );

      application.documents.citizenship =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * Cover replacement
     * ----------------------------------------------------
     */

    const cover =
      files.cover?.[0];

    if (cover) {
      const newResource =
        await processApplicationFile(
          id,
          "cover",
          cover
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.documents.cover
      );

      application.documents.cover =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * Character certificate replacement
     * ----------------------------------------------------
     */

    const characterCertificate =
      files.characterCertificate?.[0];

    if (characterCertificate) {
      const newResource =
        await processApplicationFile(
          id,
          "characterCertificate",
          characterCertificate
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.documents
          .characterCertificate
      );

      application.documents
        .characterCertificate =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * Document replacement
     * ----------------------------------------------------
     */

    const document =
      files.document?.[0];

    if (document) {
      const newResource =
        await processApplicationFile(
          id,
          "document",
          document
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.documents.document
      );

      application.documents.document =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * 12th marksheet replacement
     * ----------------------------------------------------
     */

    const marksheet12 =
      files.marksheet12?.[0];

    if (marksheet12) {
      const newResource =
        await processApplicationFile(
          id,
          "marksheet12",
          marksheet12
        );

      uploadedResources.push(
        newResource
      );

      oldResources.push(
        application.documents
          .marksheet12
      );

      application.documents
        .marksheet12 =
        newResource;
    }

    /*
     * ----------------------------------------------------
     * Save application
     * ----------------------------------------------------
     */

    await application.save();

    /*
     * ----------------------------------------------------
     * Remove old files only after DB update succeeds.
     * ----------------------------------------------------
     */

    for (
      const oldResource of oldResources
    ) {
      try {
        await removeApplicationFile(
          oldResource
        );
      } catch (cleanupError) {
        console.error(
          "Failed to remove old application file:",
          cleanupError
        );
      }
    }

    // return toApplicationResponseDto(
    //   application
    // );

    const populatedApplication =
  await application.populate<{
    program: {
      _id: typeof application.program;
      mnemonic: string;
      name: string;
    };
  }>("program");

return toApplicationResponseDto(
  populatedApplication
);
  } catch (error) {
    /*
     * ----------------------------------------------------
     * If DB update fails, remove newly uploaded files.
     * ----------------------------------------------------
     */

    for (
      const resource of uploadedResources
    ) {
      try {
        await removeApplicationFile(
          resource
        );
      } catch (cleanupError) {
        console.error(
          "Failed to clean up newly uploaded file:",
          cleanupError
        );
      }
    }

    throw error;
  }
}