// import ProgramModel from "../../models/program.model";
// import { AppError } from "../../errors/app.error";
// import { toProgramResponseDto } from "../../mapper/program.mapper";
// import CourseModel from "../../models/course.model";
// export async function getProgramService(
//   id: string
// ): Promise<ReturnType<typeof toProgramResponseDto>> {
//   const program = await ProgramModel.findById(id);

//   if (!program) {
//     throw new AppError(
//       "Program not found",
//       404,
//       "PROGRAM_NOT_FOUND"
//     );
//   }

//   return toProgramResponseDto(program);
// }
import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";
import { toProgramResponseDto } from "../../mapper/program.mapper";

export async function getProgramService(
  id: string
): Promise<ReturnType<typeof toProgramResponseDto>> {
  const program = await ProgramModel.findById(id);

  if (!program) {
    throw new AppError(
      "Program not found",
      404,
      "PROGRAM_NOT_FOUND"
    );
  }

  return toProgramResponseDto(program);
}