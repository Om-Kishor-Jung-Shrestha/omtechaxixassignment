// import {
//   Request,
//   Response,
// } from "express";

// import {
//   getApplicationsService,
// } from "../services/application/get-applications.service";

// import {
//   getApplicationService,
// } from "../services/application/get-application.service";

// import {
//   createApplicationService,
// } from "../services/application/create-application.service";

// import {
//   updateApplicationService,
// } from "../services/application/update-application.service";

// import {
//   updateApplicationStatusService,
// } from "../services/application/update-application-status.service";

// import {
//   deleteApplicationService,
// } from "../services/application/delete-application.service";

// import type {
//   CreateApplicationDto,
//   ListApplicationsQueryDto,
//   UpdateApplicationDto,
//   UpdateStatusDto,
// } from "../dtos/application.dtos";

// function getSingleParam(
//   value: string | string[] | undefined
// ): string {
//   if (Array.isArray(value)) {
//     return value[0] ?? "";
//   }

//   return value ?? "";
// }

// /*
// |--------------------------------------------------------------------------
// | Create Application
// |--------------------------------------------------------------------------
// */

// export async function createApplication(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const createdBy =
//     req.user?._id.toString();

//   const application =
//     await createApplicationService(
//       req.body as CreateApplicationDto,
//       createdBy
//     );

//   res.apiSuccess(
//     application,
//     "Application submitted successfully",
//     201
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Get Applications
// |--------------------------------------------------------------------------
// */

// export async function getApplications(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const query =
//     req.query as unknown as ListApplicationsQueryDto;

//   const result =
//     await getApplicationsService(
//       query
//     );

//   res.apiSuccess(
//     result,
//     "Applications retrieved successfully"
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Get Single Application
// |--------------------------------------------------------------------------
// */

// export async function getApplication(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const applicationId =
//     getSingleParam(
//       req.params.id
//     );

//   const application =
//     await getApplicationService(
//       applicationId
//     );

//   res.apiSuccess(
//     application,
//     "Application retrieved successfully"
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Update Application
// |--------------------------------------------------------------------------
// */

// export async function updateApplication(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const applicationId =
//     getSingleParam(
//       req.params.id
//     );

//   const application =
//     await updateApplicationService(
//       applicationId,
//       req.body as UpdateApplicationDto
//     );

//   res.apiSuccess(
//     application,
//     "Application updated successfully"
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Update Application Status
// |--------------------------------------------------------------------------
// */

// export async function updateApplicationStatus(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const applicationId =
//     getSingleParam(
//       req.params.id
//     );

//   const application =
//     await updateApplicationStatusService(
//       applicationId,
//       req.body as UpdateStatusDto
//     );

//   res.apiSuccess(
//     application,
//     "Application status updated successfully"
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Delete Application
// |--------------------------------------------------------------------------
// */

// export async function deleteApplication(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const applicationId =
//     getSingleParam(
//       req.params.id
//     );

//   await deleteApplicationService(
//     applicationId
//   );

//   res.apiSuccess(
//     null,
//     "Application deleted successfully"
//   );
// }
import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createApplicationService,
} from "../services/application/create-application.service";

import {
  getApplicationsService,
} from "../services/application/get-applications.service";

import {
  getApplicationService,
} from "../services/application/get-application.service";

import {
  updateApplicationService,
} from "../services/application/update-application.service";

import {
  updateApplicationStatusService,
} from "../services/application/update-application-status.service";

import {
  deleteApplicationService,
} from "../services/application/delete-application.service";

import {
  getApplicationFileService,
} from "../services/application/get-application-file.service";

import type {
  CreateApplicationDto,
  UpdateApplicationDto,
  UpdateStatusDto,
  ListApplicationsQueryDto,
} from "../dtos/application.dtos";

interface ApplicationUploadedFiles {
  citizenship?: Express.Multer.File[];
  cover?: Express.Multer.File[];
  characterCertificate?: Express.Multer.File[];
  document?: Express.Multer.File[];
  marksheet12?: Express.Multer.File[];
  applicantImage?: Express.Multer.File[];
}

function getSingleParam(
  value:
    | string
    | string[]
    | undefined
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function getUploadedFiles(
  req: Request
): ApplicationUploadedFiles {
  if (!req.files) {
    return {};
  }

  if (
    Array.isArray(req.files)
  ) {
    return {};
  }

  return req.files as ApplicationUploadedFiles;
}

export async function createApplication(
  req: Request,
  res: Response
): Promise<void> {
  const dto =
    req.body as CreateApplicationDto;

  const files =
    getUploadedFiles(req);

  const createdBy =
    req.user?._id.toString();

  const application =
    await createApplicationService(
      dto,
      files,
      createdBy
    );

  res.apiSuccess(
    application,
    "Application submitted successfully",
    201
  );
}

export async function getApplications(
  req: Request,
  res: Response
): Promise<void> {
  const query =
    req.query as unknown as
      ListApplicationsQueryDto;

  const result =
    await getApplicationsService(
      query
    );

  res.apiSuccess(
    result,
    "Applications retrieved successfully"
  );
}

export async function getApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId =
    getSingleParam(
      req.params.id
    );

  const application =
    await getApplicationService(
      applicationId
    );

  res.apiSuccess(
    application,
    "Application retrieved successfully"
  );
}

export async function updateApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId =
    getSingleParam(
      req.params.id
    );

  const dto =
    req.body as UpdateApplicationDto;

  const files =
    getUploadedFiles(req);

  const application =
    await updateApplicationService(
      applicationId,
      dto,
      files
    );

  res.apiSuccess(
    application,
    "Application updated successfully"
  );
}

export async function updateApplicationStatus(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId =
    getSingleParam(
      req.params.id
    );

  const dto =
    req.body as UpdateStatusDto;

  const application =
    await updateApplicationStatusService(
      applicationId,
      dto
    );

  res.apiSuccess(
    application,
    "Application status updated successfully"
  );
}

export async function deleteApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId =
    getSingleParam(
      req.params.id
    );

  await deleteApplicationService(
    applicationId
  );

  res.apiSuccess(
    null,
    "Application deleted successfully"
  );
}

export async function getApplicationFile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const applicationId =
      getSingleParam(
        req.params.id
      );

    const field =
      getSingleParam(
        req.params.field
      );

    const file =
      await getApplicationFileService(
        applicationId,
        field
      );

    res.type(
      file.format === "pdf"
        ? "application/pdf"
        : file.format
    );

    res.setHeader(
      "Content-Disposition",
      "inline"
    );

    res.sendFile(
      file.path,
      (error) => {
        if (error) {
          next(error);
        }
      }
    );
  } catch (error) {
    next(error);
  }
}