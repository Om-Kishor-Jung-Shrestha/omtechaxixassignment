import type {
  CreateProgramDto,
  ProgramResponseDto,
  UpdateProgramDto,
} from "../dtos/program.dtos";

import type { IProgram } from "../models/program.model";

// ---------- Entity -> Response DTO ----------
// ---------- Entity -> Response DTO ----------

export const toProgramResponseDto = (
  program: IProgram,
  course?: {
    duration: string;
    totalSemesters: number;
  } | null
): ProgramResponseDto => ({
  id: program._id.toString(),
  mnemonic: program.mnemonic,
  name: program.name,
  course: course
    ? {
        duration: course.duration,
        totalSemesters: course.totalSemesters,
      }
    : null,
  createdAt: program.createdAt.toISOString(),
  updatedAt: program.updatedAt.toISOString(),
});

// ---------- Create DTO -> Model Input ----------

export const toProgramInput = (
  dto: CreateProgramDto
): Partial<IProgram> => ({
  mnemonic: dto.mnemonic,
  name: dto.name,
});

// ---------- Update DTO -> Model Input ----------

export const toProgramUpdate = (
  dto: UpdateProgramDto
): Partial<IProgram> => {
  const update: Partial<IProgram> = {};

  if (dto.mnemonic !== undefined) {
    update.mnemonic = dto.mnemonic;
  }

  if (dto.name !== undefined) {
    update.name = dto.name;
  }

  return update;
};