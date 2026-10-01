import CourseModel from "../../models/course.model";
import ProgramModel from "../../models/program.model";

import { AppError } from "../../errors/app.error";

// import {
//   toCourseInput,
//   toCourseResponseDto,
// } from "../../mappers/course.mapper";

import type { CreateCourseDto } from "../../dtos/course.dtos";
import { toCourseInput, toCourseResponseDto } from "../../mapper/course.mapper";

export async function createCourseService(
  dto: CreateCourseDto
): Promise<ReturnType<typeof toCourseResponseDto>> {
  const program =
    await ProgramModel.findById(dto.program);

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
    });

  if (existingCourse) {
    throw new AppError(
      "A course already exists for this program",
      409,
      "COURSE_ALREADY_EXISTS"
    );
  }

  const course =
    await CourseModel.create(
      toCourseInput(dto)
    );

  return toCourseResponseDto(course);
}