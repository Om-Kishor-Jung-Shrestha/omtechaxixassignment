

// import { Types } from "mongoose";

// import type {
//   ApplicationResponseDto,
//   CreateApplicationDto,
//   ListApplicationsQueryDto,
// } from "../dtos/application.dtos";

// import type {
//   ApplicationStatus,
//   ApplicationIntake,
//   IApplication,
// } from "../models/application.model";

// export const toApplicationFileDto = (
//   file: IApplication["documents"]["citizenship"]
// ): ApplicationResponseDto["documents"]["citizenship"] => ({
//   storage: file.storage,
//   public_id: file.public_id,
//   url: file.url,
//   ...(file.path ? { path: file.path } : {}),
//   resourceType: file.resourceType,
//   format: file.format,
// });

// export const toApplicantImageDto = (
//   file: IApplication["applicantImage"]
// ): ApplicationResponseDto["applicantImage"] => ({
//   storage: file.storage,
//   public_id: file.public_id,
//   url: file.url,
//   ...(file.path ? { path: file.path } : {}),
//   resourceType: file.resourceType,
//   format: file.format,
// });

// export const toApplicationResponseDto = (
//   application: IApplication
// ): ApplicationResponseDto => ({
//   id: application._id.toString(),

//   firstName: application.firstName,

//   middleName:
//     application.middleName || undefined,

//   lastName: application.lastName,

//   email: application.email,

//   phone: application.phone,

//   program:
//     application.program.toString(),

//   admissionSession:
//     application.admissionSession,

//   admissionIntake:
//     application.admissionIntake,

//   academicQualification:
//     application.academicQualification,

//   academicHistory: {
//     collegeOrSchool:
//       application.academicHistory
//         .collegeOrSchool,

//     board:
//       application.academicHistory.board,

//     gradeOrGpa:
//       application.academicHistory.gradeOrGpa,
//   },

//   address:
//     application.address,

//   status:
//     application.status,

//   documents: {
//     citizenship:
//       toApplicationFileDto(
//         application.documents.citizenship
//       ),

//     cover:
//       toApplicationFileDto(
//         application.documents.cover
//       ),

//     characterCertificate:
//       toApplicationFileDto(
//         application.documents
//           .characterCertificate
//       ),

//     document:
//       toApplicationFileDto(
//         application.documents.document
//       ),

//     marksheet12:
//       toApplicationFileDto(
//         application.documents.marksheet12
//       ),
//   },

//   applicantImage:
//     toApplicantImageDto(
//       application.applicantImage
//     ),

//   createdBy:
//     application.createdBy
//       ? application.createdBy.toString()
//       : undefined,

//   createdAt:
//     application.createdAt.toISOString(),

//   updatedAt:
//     application.updatedAt.toISOString(),
// });

// export interface PaginatedApplicationsResponseDto {
//   data: ApplicationResponseDto[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//     totalPages: number;
//     hasNextPage: boolean;
//     hasPreviousPage: boolean;
//   };
// }

// export const toPaginatedApplicationsDto = (
//   items: IApplication[],
//   total: number,
//   page: number,
//   limit: number
// ): PaginatedApplicationsResponseDto => {
//   const totalPages =
//     Math.ceil(total / limit);

//   return {
//     data: items.map(
//       toApplicationResponseDto
//     ),

//     meta: {
//       total,
//       page,
//       limit,
//       totalPages,
//       hasNextPage:
//         page < totalPages,
//       hasPreviousPage:
//         page > 1,
//     },
//   };
// };

// export const toApplicationInput = (
//   dto: CreateApplicationDto,
//   createdBy?: string
// ): Partial<IApplication> => ({
//   firstName: dto.firstName,

//   middleName:
//     dto.middleName,

//   lastName: dto.lastName,

//   email: dto.email,

//   phone: dto.phone,

//   program:
//     new Types.ObjectId(dto.program),

//   admissionSession:
//     dto.admissionSession,

//   admissionIntake:
//     dto.admissionIntake,

//   academicQualification:
//     dto.academicQualification,

//   academicHistory: {
//     collegeOrSchool:
//       dto.academicHistory
//         .collegeOrSchool,

//     board:
//       dto.academicHistory.board,

//     gradeOrGpa:
//       dto.academicHistory.gradeOrGpa,
//   },

//   address:
//     dto.address,

//   ...(dto.status
//     ? {
//         status: dto.status,
//       }
//     : {}),

//   ...(createdBy
//     ? {
//         createdBy:
//           new Types.ObjectId(
//             createdBy
//           ),
//       }
//     : {}),
// });

// export interface ApplicationFilter {
//   program?: Types.ObjectId;
//   status?: ApplicationStatus;
//   admissionSession?: string;
//   admissionIntake?: ApplicationIntake;
//   $or?: Array<
//     Record<string, RegExp>
//   >;
// }

// export const escapeRegex = (
//   value: string
// ): string =>
//   value.replace(
//     /[.*+?^${}()|[\]\\]/g,
//     String.raw`\$&`
//   );

// export const toApplicationFilter = (
//   query: ListApplicationsQueryDto
// ): ApplicationFilter => {
//   const filter: ApplicationFilter = {};

//   if (query.program) {
//     filter.program =
//       new Types.ObjectId(
//         query.program
//       );
//   }

//   if (query.status) {
//     filter.status =
//       query.status;
//   }

//   if (query.admissionSession) {
//     filter.admissionSession =
//       query.admissionSession;
//   }

//   if (query.admissionIntake) {
//     filter.admissionIntake =
//       query.admissionIntake;
//   }

//   if (query.search?.trim()) {
//     const pattern = new RegExp(
//       escapeRegex(
//         query.search.trim()
//       ),
//       "i"
//     );

//     filter.$or = [
//       {
//         firstName: pattern,
//       },
//       {
//         middleName: pattern,
//       },
//       {
//         lastName: pattern,
//       },
//       {
//         email: pattern,
//       },
//       {
//         phone: pattern,
//       },
//     ];
//   }

//   return filter;
// };
import { Types } from "mongoose";

import type {
  ApplicationProgramResponseDto,
  ApplicationResponseDto,
  CreateApplicationDto,
  ListApplicationsQueryDto,
} from "../dtos/application.dtos";

import type {
  ApplicationStatus,
  ApplicationIntake,
  IApplication,
} from "../models/application.model";

/*
|--------------------------------------------------------------------------
| Populated Program
|--------------------------------------------------------------------------
*/

export interface PopulatedApplicationProgram {
  _id: Types.ObjectId;
  mnemonic: string;
  name: string;
}

/*
|--------------------------------------------------------------------------
| Application With Populated Program
|--------------------------------------------------------------------------
*/

export type ApplicationWithPopulatedProgram = Omit<
  IApplication,
  "program"
> & {
  program: PopulatedApplicationProgram;
};

/*
|--------------------------------------------------------------------------
| Application File
|--------------------------------------------------------------------------
*/

export const toApplicationFileDto = (
  file: IApplication["documents"]["citizenship"]
): ApplicationResponseDto["documents"]["citizenship"] => ({
  storage: file.storage,
  public_id: file.public_id,
  url: file.url,
  ...(file.path ? { path: file.path } : {}),
  resourceType: file.resourceType,
  format: file.format,
});

/*
|--------------------------------------------------------------------------
| Applicant Image
|--------------------------------------------------------------------------
*/

export const toApplicantImageDto = (
  file: IApplication["applicantImage"]
): ApplicationResponseDto["applicantImage"] => ({
  storage: file.storage,
  public_id: file.public_id,
  url: file.url,
  ...(file.path ? { path: file.path } : {}),
  resourceType: file.resourceType,
  format: file.format,
});

/*
|--------------------------------------------------------------------------
| Program
|--------------------------------------------------------------------------
*/

export const toApplicationProgramDto = (
  program: PopulatedApplicationProgram
): ApplicationProgramResponseDto => ({
  id: program._id.toString(),
  mnemonic: program.mnemonic,
  name: program.name,
});

/*
|--------------------------------------------------------------------------
| Application Response
|--------------------------------------------------------------------------
*/

export const toApplicationResponseDto = (
  application: ApplicationWithPopulatedProgram
): ApplicationResponseDto => ({
  id: application._id.toString(),

  firstName: application.firstName,

  middleName:
    application.middleName || undefined,

  lastName: application.lastName,

  email: application.email,

  phone: application.phone,

  program: toApplicationProgramDto(
    application.program
  ),

  admissionSession:
    application.admissionSession,

  admissionIntake:
    application.admissionIntake,

  academicQualification:
    application.academicQualification,

  academicHistory: {
    collegeOrSchool:
      application.academicHistory
        .collegeOrSchool,

    board:
      application.academicHistory.board,

    gradeOrGpa:
      application.academicHistory.gradeOrGpa,
  },

  address: application.address,

  status: application.status,

  documents: {
    citizenship:
      toApplicationFileDto(
        application.documents.citizenship
      ),

    cover:
      toApplicationFileDto(
        application.documents.cover
      ),

    characterCertificate:
      toApplicationFileDto(
        application.documents
          .characterCertificate
      ),

    document:
      toApplicationFileDto(
        application.documents.document
      ),

    marksheet12:
      toApplicationFileDto(
        application.documents.marksheet12
      ),
  },

  applicantImage:
    toApplicantImageDto(
      application.applicantImage
    ),

  createdBy: application.createdBy
    ? application.createdBy.toString()
    : undefined,

  createdAt:
    application.createdAt.toISOString(),

  updatedAt:
    application.updatedAt.toISOString(),
});

/*
|--------------------------------------------------------------------------
| Paginated Applications Response
|--------------------------------------------------------------------------
*/

export interface PaginatedApplicationsResponseDto {
  data: ApplicationResponseDto[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const toPaginatedApplicationsDto = (
  items: ApplicationWithPopulatedProgram[],
  total: number,
  page: number,
  limit: number
): PaginatedApplicationsResponseDto => {
  const totalPages =
    Math.ceil(total / limit);

  return {
    data: items.map(
      toApplicationResponseDto
    ),

    meta: {
      total,

      page,

      limit,

      totalPages,

      hasNextPage:
        page < totalPages,

      hasPreviousPage:
        page > 1,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Application Input
|--------------------------------------------------------------------------
*/

export const toApplicationInput = (
  dto: CreateApplicationDto,
  createdBy?: string
): Partial<IApplication> => ({
  firstName: dto.firstName,

  middleName: dto.middleName,

  lastName: dto.lastName,

  email: dto.email,

  phone: dto.phone,

  program:
    new Types.ObjectId(dto.program),

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

  ...(dto.status
    ? {
        status: dto.status,
      }
    : {}),

  ...(createdBy
    ? {
        createdBy:
          new Types.ObjectId(createdBy),
      }
    : {}),
});

/*
|--------------------------------------------------------------------------
| Application Filter
|--------------------------------------------------------------------------
*/

export interface ApplicationFilter {
  program?: Types.ObjectId;

  status?: ApplicationStatus;

  admissionSession?: string;

  admissionIntake?: ApplicationIntake;

  $and?: Array<
    Record<string, unknown>
  >;
}

/*
|--------------------------------------------------------------------------
| Escape Regex
|--------------------------------------------------------------------------
*/

export const escapeRegex = (
  value: string
): string =>
  value.replace(
    /[.*+?^${}()|[\]\\]/g,
    String.raw`\$&`
  );

/*
|--------------------------------------------------------------------------
| Application Filter Builder
|--------------------------------------------------------------------------
|
| Separate filters are combined with AND.
|
| name:
|   firstName OR middleName OR lastName
|
| email:
|   partial, case-insensitive email match
|
| phone:
|   partial, case-insensitive phone match
|
| search:
|   legacy/general search across applicant fields
|
|--------------------------------------------------------------------------
*/

export const toApplicationFilter = (
  query: ListApplicationsQueryDto
): ApplicationFilter => {
  const filter: ApplicationFilter = {};

  /*
  |--------------------------------------------------------------------------
  | Exact Application Filters
  |--------------------------------------------------------------------------
  */

  if (query.program) {
    filter.program =
      new Types.ObjectId(
        query.program
      );
  }

  if (query.status) {
    filter.status =
      query.status;
  }

  if (query.admissionSession) {
    filter.admissionSession =
      query.admissionSession;
  }

  if (query.admissionIntake) {
    filter.admissionIntake =
      query.admissionIntake;
  }

  /*
  |--------------------------------------------------------------------------
  | Text Filters
  |--------------------------------------------------------------------------
  */

  const conditions: Array<
    Record<string, unknown>
  > = [];

  /*
  |--------------------------------------------------------------------------
  | Name
  |--------------------------------------------------------------------------
  |
  | Example:
  | name=John
  |
  | Matches:
  | John Doe
  | Johnny Smith
  | Jane John Doe
  |
  */

  if (query.name?.trim()) {
    const pattern = new RegExp(
      escapeRegex(
        query.name.trim()
      ),
      "i"
    );

    conditions.push({
      $or: [
        {
          firstName: pattern,
        },
        {
          middleName: pattern,
        },
        {
          lastName: pattern,
        },
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Email
  |--------------------------------------------------------------------------
  */

  if (query.email?.trim()) {
    const pattern = new RegExp(
      escapeRegex(
        query.email.trim()
      ),
      "i"
    );

    conditions.push({
      email: pattern,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Phone
  |--------------------------------------------------------------------------
  */

  if (query.phone?.trim()) {
    const pattern = new RegExp(
      escapeRegex(
        query.phone.trim()
      ),
      "i"
    );

    conditions.push({
      phone: pattern,
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Legacy General Search
  |--------------------------------------------------------------------------
  |
  | Kept for API compatibility.
  |
  */

  if (query.search?.trim()) {
    const pattern = new RegExp(
      escapeRegex(
        query.search.trim()
      ),
      "i"
    );

    conditions.push({
      $or: [
        {
          firstName: pattern,
        },
        {
          middleName: pattern,
        },
        {
          lastName: pattern,
        },
        {
          email: pattern,
        },
        {
          phone: pattern,
        },
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Combine Text Conditions
  |--------------------------------------------------------------------------
  |
  | Using $and allows name, email and phone
  | to work independently without one filter
  | overwriting another $or condition.
  |
  */

  if (conditions.length > 0) {
    filter.$and = conditions;
  }

  return filter;
};