import ProgramModel from "../../models/program.model";
import CourseModel from "../../models/course.model";
import { AppError } from "../../errors/app.error";

export async function deleteProgramService(
  id: string
): Promise<void> {
  const program =
    await ProgramModel.findById(id);

  if (!program) {
    throw new AppError(
      "Program not found",
      404,
      "PROGRAM_NOT_FOUND"
    );
  }

  const course =
    await CourseModel.findOne({
      program: program._id,
    });

  if (course) {
    throw new AppError(
      "Cannot delete a program that has a course",
      409,
      "PROGRAM_HAS_COURSE"
    );
  }

  await program.deleteOne();
}