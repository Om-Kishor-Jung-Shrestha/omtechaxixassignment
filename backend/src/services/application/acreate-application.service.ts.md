import ApplicationModel from "../../models/application.model";
import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";

// import {
//   toApplicationInput,
//   toApplicationResponseDto,
// } from "../../mapper/application.mapper";

import type { CreateApplicationDto } from "../../dtos/application.dtos";
import { toApplicationInput, toApplicationResponseDto } from "../../mapper/applicaiton.mapper";

export async function createApplicationService(
  dto: CreateApplicationDto,
  createdBy?: string
): Promise<
  ReturnType<typeof toApplicationResponseDto>
> {
  const program =
    await ProgramModel.findById(dto.program);

  if (!program) {
    throw new AppError(
      "Program not found",
      404,
      "PROGRAM_NOT_FOUND"
    );
  }

  const application =
    await ApplicationModel.create(
      toApplicationInput(dto, createdBy)
    );

  return toApplicationResponseDto(
    application
  );
}