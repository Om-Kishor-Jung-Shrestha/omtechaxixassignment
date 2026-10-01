import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";
import { CreateProgramDto } from "../../dtos/program.dtos";
import { toProgramInput, toProgramResponseDto } from "../../mapper/program.mapper";
// import {
//   toProgramInput,
//   toProgramResponseDto,
// } from "../../mappers/program.mapper";
// import type { CreateProgramDto } from "../../dtos/program.dtos";

export async function createProgramService(
  dto: CreateProgramDto
): Promise<ReturnType<typeof toProgramResponseDto>> {
  const mnemonic = dto.mnemonic.trim().toUpperCase();
  const name = dto.name.trim();

  const existingProgram =
    await ProgramModel.findOne({
      $or: [
        { mnemonic },
        { name },
      ],
    });

  if (existingProgram) {
    if (existingProgram.mnemonic === mnemonic) {
      throw new AppError(
        "A program with this mnemonic already exists",
        409,
        "PROGRAM_MNEMONIC_ALREADY_EXISTS"
      );
    }

    throw new AppError(
      "A program with this name already exists",
      409,
      "PROGRAM_NAME_ALREADY_EXISTS"
    );
  }

  const program = await ProgramModel.create(
    toProgramInput({
      ...dto,
      mnemonic,
      name,
    })
  );

  return toProgramResponseDto(program);
}