import CourseModel from "../../models/course.model";
import { AppError } from "../../errors/app.error";
import { toCourseResponseDto } from "../../mapper/course.mapper";

export async function getCourseService(
  id: string
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

  return toCourseResponseDto(course);
}