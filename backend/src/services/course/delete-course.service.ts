import CourseModel from "../../models/course.model";
import { AppError } from "../../errors/app.error";

export async function deleteCourseService(
  id: string
): Promise<void> {
  const course =
    await CourseModel.findById(id);

  if (!course) {
    throw new AppError(
      "Course not found",
      404,
      "COURSE_NOT_FOUND"
    );
  }

  await course.deleteOne();
}