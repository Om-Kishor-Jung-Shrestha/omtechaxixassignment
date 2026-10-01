import { Types } from "mongoose";

import type {
  CourseResponseDto,
  CreateCourseDto,
  UpdateCourseDto,
} from "../dtos/course.dtos";

import type {
  ICourse,

} from "../models/course.model";

// ---------- Entity -> Response DTO ----------

export const toCourseResponseDto = (
  course: ICourse
): CourseResponseDto => ({
  id: course._id.toString(),

  program: course.program.toString(),

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

  semesters: course.semesters.map(
    (semester) => ({
      semesterNumber:
        semester.semesterNumber,

      subjects: semester.subjects.map(
        (subject) => ({
          subjectName: subject.subjectName,

          syllabusCode:
            subject.syllabusCode,

          isElective:
            subject.isElective,

          specializedArea:
            subject.specializedArea
              ? {
                  subjectName:
                    subject.specializedArea
                      .subjectName,

                  syllabusCode:
                    subject.specializedArea
                      .syllabusCode,
                }
              : undefined,
        })
      ),
    })
  ),

  feeStructureFile: {
    public_id:
      course.feeStructureFile.public_id,

    url:
      course.feeStructureFile.url,

    resourceType:
      course.feeStructureFile.resourceType,

    format:
      course.feeStructureFile.format,
  },

  semesterFees: course.semesterFees.map(
    (fee) => ({
      semesterNumber:
        fee.semesterNumber,

      amount: fee.amount,
    })
  ),

  totalFee: course.totalFee,

  createdAt:
    course.createdAt.toISOString(),

  updatedAt:
    course.updatedAt.toISOString(),
});

// ---------- Create DTO -> Model Input ----------

export const toCourseInput = (
  dto: CreateCourseDto
): Partial<ICourse> => ({
  program: new Types.ObjectId(dto.program),

  duration: dto.duration,

  totalSemesters:
    dto.totalSemesters,

  overview: {
    introduction:
      dto.overview.introduction,

    objectives: [
      ...dto.overview.objectives,
    ],

    careerOpportunities: [
      ...dto.overview.careerOpportunities,
    ],
  },

  highlights: [...dto.highlights],

  semesters: dto.semesters.map(
    (semester) => ({
      semesterNumber:
        semester.semesterNumber,

      subjects:
        semester.subjects.map(
          (subject) => ({
            subjectName:
              subject.subjectName,

            syllabusCode:
              subject.syllabusCode,

            isElective:
              subject.isElective,

            specializedArea:
              subject.specializedArea
                ? {
                    subjectName:
                      subject.specializedArea
                        .subjectName,

                    syllabusCode:
                      subject.specializedArea
                        .syllabusCode,
                  }
                : undefined,
          })
        ),
    })
  ),

  feeStructureFile: {
    public_id:
      dto.feeStructureFile.public_id,

    url:
      dto.feeStructureFile.url,

    resourceType:
      dto.feeStructureFile.resourceType,

    format:
      dto.feeStructureFile.format,
  },

  semesterFees:
    dto.semesterFees.map(
      (fee) => ({
        semesterNumber:
          fee.semesterNumber,

        amount: fee.amount,
      })
    ),

  // Do NOT take totalFee from the client.
  // Course model calculates it in pre("save").
  totalFee: 0,
});

// ---------- Update DTO -> Model Update ----------

export const toCourseUpdate = (
  dto: UpdateCourseDto
): Partial<ICourse> => {
  const update: Partial<ICourse> = {};

  if (dto.program !== undefined) {
    update.program =
      new Types.ObjectId(dto.program);
  }

  if (dto.duration !== undefined) {
    update.duration = dto.duration;
  }

  if (dto.totalSemesters !== undefined) {
    update.totalSemesters =
      dto.totalSemesters;
  }

  if (dto.overview !== undefined) {
    update.overview = {
      introduction:
        dto.overview.introduction,

      objectives: [
        ...dto.overview.objectives,
      ],

      careerOpportunities: [
        ...dto.overview.careerOpportunities,
      ],
    };
  }

  if (dto.highlights !== undefined) {
    update.highlights = [
      ...dto.highlights,
    ];
  }

  if (dto.semesters !== undefined) {
    update.semesters =
      dto.semesters.map(
        (semester) => ({
          semesterNumber:
            semester.semesterNumber,

          subjects:
            semester.subjects.map(
              (subject) => ({
                subjectName:
                  subject.subjectName,

                syllabusCode:
                  subject.syllabusCode,

                isElective:
                  subject.isElective,

                specializedArea:
                  subject.specializedArea
                    ? {
                        subjectName:
                          subject
                            .specializedArea
                            .subjectName,

                        syllabusCode:
                          subject
                            .specializedArea
                            .syllabusCode,
                      }
                    : undefined,
              })
            ),
        })
      );
  }

  if (
    dto.feeStructureFile !==
    undefined
  ) {
    update.feeStructureFile = {
      public_id:
        dto.feeStructureFile.public_id,

      url:
        dto.feeStructureFile.url,

      resourceType:
        dto.feeStructureFile.resourceType,

      format:
        dto.feeStructureFile.format,
    };
  }

  if (dto.semesterFees !== undefined) {
    update.semesterFees =
      dto.semesterFees.map(
        (fee) => ({
          semesterNumber:
            fee.semesterNumber,

          amount: fee.amount,
        })
      );

    // Recalculate through model pre-save.
    update.totalFee = 0;
  }

  return update;
};