import ProgramModel from "../../models/program.model";
import { AppError } from "../../errors/app.error";
// import {
//   toProgramResponseDto,
//   toProgramUpdate,
// } from "../../mappers/program.mapper";
import type { UpdateProgramDto } from "../../dtos/program.dtos";
import { toProgramResponseDto, toProgramUpdate } from "../../mapper/program.mapper";

export async function updateProgramService(
  id: string,
  dto: UpdateProgramDto
): Promise<ReturnType<typeof toProgramResponseDto>> {
  const program =
    await ProgramModel.findById(id);

  if (!program) {
    throw new AppError(
      "Program not found",
      404,
      "PROGRAM_NOT_FOUND"
    );
  }

  const updateDto: UpdateProgramDto = {
    ...dto,
  };

  if (updateDto.mnemonic !== undefined) {
    updateDto.mnemonic =
      updateDto.mnemonic
        .trim()
        .toUpperCase();
  }

  if (updateDto.name !== undefined) {
    updateDto.name =
      updateDto.name.trim();
  }

  if (
    updateDto.mnemonic !== undefined ||
    updateDto.name !== undefined
  ) {
    const duplicateConditions = [];

    if (
      updateDto.mnemonic !== undefined
    ) {
      duplicateConditions.push({
        mnemonic:
          updateDto.mnemonic,
      });
    }

    if (
      updateDto.name !== undefined
    ) {
      duplicateConditions.push({
        name: updateDto.name,
      });
    }

    const duplicate =
      await ProgramModel.findOne({
        $or: duplicateConditions,
        _id: {
          $ne: program._id,
        },
      });

    if (duplicate) {
      if (
        updateDto.mnemonic !== undefined &&
        duplicate.mnemonic ===
          updateDto.mnemonic
      ) {
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
  }

  const update =
    toProgramUpdate(updateDto);

  Object.assign(program, update);

  await program.save();

  return toProgramResponseDto(program);
}