import {
  Types,
} from "mongoose";

import ApplicationModel from "../../models/application.model";
import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";

// import {
//   toApplicationResponseDto,
// } from "../../mapper/application.mapper";

import type {
  CreateApplicationDto,
} from "../../dtos/application.dtos";

import {
  processApplicationFile,
  removeApplicationFile,
} from "./application-file.service";
import { toApplicationResponseDto } from "../../mapper/applicaiton.mapper";

interface ApplicationUploadedFiles {
  citizenship?: Express.Multer.File[];
  cover?: Express.Multer.File[];
  characterCertificate?: Express.Multer.File[];
  document?: Express.Multer.File[];
  marksheet12?: Express.Multer.File[];
  applicantImage?: Express.Multer.File[];
}

function getRequiredFile(
  files: ApplicationUploadedFiles,
  field: keyof ApplicationUploadedFiles
): Express.Multer.File {
  const file = files[field]?.[0];

  if (!file) {
    throw new AppError(
      `${field} file is required`,
      400,
      "APPLICATION_FILE_REQUIRED"
    );
  }

  return file;
}

export async function createApplicationService(
  dto: CreateApplicationDto,
  files: ApplicationUploadedFiles,
  createdBy?: string
): Promise<
  ReturnType<typeof toApplicationResponseDto>
> {
  /*
   * ------------------------------------------------------
   * 1. Verify program
   * ------------------------------------------------------
   */

  const program = await ProgramModel.findById(
    dto.program
  );

  if (!program) {
    throw new AppError(
      "Program not found",
      404,
      "PROGRAM_NOT_FOUND"
    );
  }

  /*
   * ------------------------------------------------------
   * 2. Validate all required files
   * ------------------------------------------------------
   */

  const applicantImage = getRequiredFile(
    files,
    "applicantImage"
  );

  const citizenship = getRequiredFile(
    files,
    "citizenship"
  );

  const cover = getRequiredFile(
    files,
    "cover"
  );

  const characterCertificate =
    getRequiredFile(
      files,
      "characterCertificate"
    );

  const document = getRequiredFile(
    files,
    "document"
  );

  const marksheet12 = getRequiredFile(
    files,
    "marksheet12"
  );

  /*
   * ------------------------------------------------------
   * 3. Generate MongoDB ID before saving
   *
   * This ID is used as the filesystem directory name and
   * Cloudinary folder identifier.
   * ------------------------------------------------------
   */

  const applicationId =
    new Types.ObjectId();

  const processedResources: Array<
    Awaited<
      ReturnType<
        typeof processApplicationFile
      >
    >
  > = [];

  try {
    /*
     * ----------------------------------------------------
     * 4. Store applicant image
     * ----------------------------------------------------
     */

    const applicantImageResource =
      await processApplicationFile(
        applicationId.toString(),
        "applicantImage",
        applicantImage
      );

    processedResources.push(
      applicantImageResource
    );

    /*
     * ----------------------------------------------------
     * 5. Store citizenship PDF
     * ----------------------------------------------------
     */

    const citizenshipResource =
      await processApplicationFile(
        applicationId.toString(),
        "citizenship",
        citizenship
      );

    processedResources.push(
      citizenshipResource
    );

    /*
     * ----------------------------------------------------
     * 6. Store cover PDF
     * ----------------------------------------------------
     */

    const coverResource =
      await processApplicationFile(
        applicationId.toString(),
        "cover",
        cover
      );

    processedResources.push(
      coverResource
    );

    /*
     * ----------------------------------------------------
     * 7. Store character certificate PDF
     * ----------------------------------------------------
     */

    const characterCertificateResource =
      await processApplicationFile(
        applicationId.toString(),
        "characterCertificate",
        characterCertificate
      );

    processedResources.push(
      characterCertificateResource
    );

    /*
     * ----------------------------------------------------
     * 8. Store other document PDF
     * ----------------------------------------------------
     */

    const documentResource =
      await processApplicationFile(
        applicationId.toString(),
        "document",
        document
      );

    processedResources.push(
      documentResource
    );

    /*
     * ----------------------------------------------------
     * 9. Store 12th marksheet PDF
     * ----------------------------------------------------
     */

    const marksheet12Resource =
      await processApplicationFile(
        applicationId.toString(),
        "marksheet12",
        marksheet12
      );

    processedResources.push(
      marksheet12Resource
    );

    /*
     * ----------------------------------------------------
     * 10. Create complete application
     * ----------------------------------------------------
     */

    const application =
      await ApplicationModel.create({
        _id: applicationId,

        firstName: dto.firstName,

        middleName:
          dto.middleName,

        lastName: dto.lastName,

        email: dto.email,

        phone: dto.phone,

        program:
          program._id,

        admissionSession:
          dto.admissionSession,

        admissionIntake:
          dto.admissionIntake,

        academicQualification:
          dto.academicQualification,

        academicHistory: {
          collegeOrSchool:
            dto.academicHistory
              .collegeOrSchool,

          board:
            dto.academicHistory.board,

          gradeOrGpa:
            dto.academicHistory.gradeOrGpa,
        },

        address: dto.address,

        status:
          dto.status ?? "pending",

        documents: {
          citizenship:
            citizenshipResource,

          cover:
            coverResource,

          characterCertificate:
            characterCertificateResource,

          document:
            documentResource,

          marksheet12:
            marksheet12Resource,
        },

        applicantImage:
          applicantImageResource,

        ...(createdBy
          ? {
              createdBy:
                new Types.ObjectId(
                  createdBy
                ),
            }
          : {}),
      });

    /*
     * ----------------------------------------------------
     * 11. Return response DTO
     * ----------------------------------------------------
     */
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
    // return toApplicationResponseDto(
    //   application
    // );
  } catch (error) {
    /*
     * ----------------------------------------------------
     * Cleanup every file successfully stored before the
     * failure.
     * ----------------------------------------------------
     */

    for (
      const resource of processedResources
    ) {
      try {
        await removeApplicationFile(
          resource
        );
      } catch (cleanupError) {
        console.error(
          "Failed to clean up application file:",
          cleanupError
        );
      }
    }

    throw error;
  }
}