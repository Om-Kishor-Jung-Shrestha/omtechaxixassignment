import CourseModel from "../../models/course.model";
import ProgramModel from "../../models/program.model";

import { AppError } from "../../errors/app.error";

import {
  toCourseResponseDto,
  toCourseUpdate,
} from "../../mapper/course.mapper";

import type { UpdateCourseDto } from "../../dtos/course.dtos";

export async function updateCourseService(
  id: string,
  dto: UpdateCourseDto
): Promise<ReturnType<typeof toCourseResponseDto>> {
  const course =
    await CourseModel.findById(id);

  if (!course) {
    throw new AppError(
      "Course not found",
      404,
      "COURSE_NOT_FOUND"
    );
  }

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

    const existingCourse =
      await CourseModel.findOne({
        program: program._id,
        _id: {
          $ne: course._id,
        },
      });

    if (existingCourse) {
      throw new AppError(
        "A course already exists for this program",
        409,
        "COURSE_ALREADY_EXISTS"
      );
    }
  }

  const update =
    toCourseUpdate(dto);

  Object.assign(course, update);

  await course.save();

  return toCourseResponseDto(course);
}