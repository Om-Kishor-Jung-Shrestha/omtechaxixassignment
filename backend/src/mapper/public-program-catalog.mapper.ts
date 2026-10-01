// import type { ICourse } from "../models/course.model";
// import type { IProgram } from "../models/program.model";

// import type {
//   PublicCourseDetailsDto,
//   PublicProgramCatalogItemDto,
// } from "../dtos/public-program-catalog.dtos";

// type PopulatedCourse = Omit<ICourse, "program"> & {
//   program: IProgram;
// };

// export const toPublicProgramCatalogItemDto = (
//   course: PopulatedCourse,
// ): PublicProgramCatalogItemDto => ({
//   id: course._id.toString(),

//   mnemonic: course.program.mnemonic,

//   name: course.program.name,

//   duration: course.duration,

//   totalSemesters: course.totalSemesters,

//   totalFee: course.totalFee,
// });

// export const toPublicCourseDetailsDto = (
//   course: PopulatedCourse,
// ): PublicCourseDetailsDto => ({
//   id: course._id.toString(),

//   program: {
//     id: course.program._id.toString(),
//     mnemonic: course.program.mnemonic,
//     name: course.program.name,
//   },

//   duration: course.duration,

//   totalSemesters: course.totalSemesters,

//   overview: {
//     introduction: course.overview.introduction,

//     objectives: [...course.overview.objectives],

//     careerOpportunities: [
//       ...course.overview.careerOpportunities,
//     ],
//   },

//   highlights: [...course.highlights],

//   semesters: course.semesters.map((semester) => ({
//     semesterNumber: semester.semesterNumber,

//     subjects: semester.subjects.map((subject) => ({
//       subjectName: subject.subjectName,

//       syllabusCode: subject.syllabusCode,

//       isElective: subject.isElective,

//       specializedArea: subject.specializedArea
//         ? {
//             subjectName:
//               subject.specializedArea.subjectName,

//             syllabusCode:
//               subject.specializedArea.syllabusCode,
//           }
//         : undefined,
//     })),
//   })),

//   feeStructureFile: {
//     public_id: course.feeStructureFile.public_id,

//     url: course.feeStructureFile.url,

//     resourceType: course.feeStructureFile.resourceType,

//     format: course.feeStructureFile.format,
//   },

//   semesterFees: course.semesterFees.map((fee) => ({
//     semesterNumber: fee.semesterNumber,

//     amount: fee.amount,
//   })),

//   totalFee: course.totalFee,

//   createdAt: course.createdAt.toISOString(),

//   updatedAt: course.updatedAt.toISOString(),
// });


import type { ICourse } from "../models/course.model";

import type {
  PublicCourseDetailsDto,
  PublicProgramCatalogItemDto,
} from "../dtos/public-program-catalog.dtos";

type PublicProgramReference = {
  _id: ICourse["program"];
  mnemonic: string;
  name: string;
};

type PublicProgramCatalogCourse = {
  _id: ICourse["_id"];
  duration: ICourse["duration"];
  totalSemesters: ICourse["totalSemesters"];
  totalFee: ICourse["totalFee"];
  program: PublicProgramReference;
};

type PopulatedCourse = Omit<ICourse, "program"> & {
  program: {
    _id: ICourse["program"];
    mnemonic: string;
    name: string;
  };
};

export const toPublicProgramCatalogItemDto = (
  course: PublicProgramCatalogCourse,
): PublicProgramCatalogItemDto => ({
  id: course._id.toString(),

  mnemonic: course.program.mnemonic,

  name: course.program.name,

  duration: course.duration,

  totalSemesters: course.totalSemesters,

  totalFee: course.totalFee,
});

export const toPublicCourseDetailsDto = (
  course: PopulatedCourse,
): PublicCourseDetailsDto => ({
  id: course._id.toString(),

  program: {
    id: course.program._id.toString(),
    mnemonic: course.program.mnemonic,
    name: course.program.name,
  },

  duration: course.duration,

  totalSemesters: course.totalSemesters,

  overview: {
    introduction: course.overview.introduction,

    objectives: [...course.overview.objectives],

    careerOpportunities: [
      ...course.overview.careerOpportunities,
    ],
  },

  highlights: [...course.highlights],

  semesters: course.semesters.map((semester) => ({
    semesterNumber: semester.semesterNumber,

    subjects: semester.subjects.map((subject) => ({
      subjectName: subject.subjectName,

      syllabusCode: subject.syllabusCode,

      isElective: subject.isElective,

      specializedArea: subject.specializedArea
        ? {
            subjectName:
              subject.specializedArea.subjectName,

            syllabusCode:
              subject.specializedArea.syllabusCode,
          }
        : undefined,
    })),
  })),

  feeStructureFile: {
    public_id: course.feeStructureFile.public_id,

    url: course.feeStructureFile.url,

    resourceType: course.feeStructureFile.resourceType,

    format: course.feeStructureFile.format,
  },

  semesterFees: course.semesterFees.map((fee) => ({
    semesterNumber: fee.semesterNumber,

    amount: fee.amount,
  })),

  totalFee: course.totalFee,

  createdAt: course.createdAt.toISOString(),

  updatedAt: course.updatedAt.toISOString(),
});
