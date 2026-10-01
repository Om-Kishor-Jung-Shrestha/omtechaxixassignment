import { Request, Response } from "express";

import { createProgramService } from "../services/program/create-program.service";
import { getProgramsService } from "../services/program/get-programs.service";
import { getProgramService } from "../services/program/get-program.service";
import { updateProgramService } from "../services/program/update-program.service";
import { deleteProgramService } from "../services/program/delete-program.service";

import type { ProgramQueryDto } from "../dtos/program-query.dtos";

function getSingleParam(
  value: string | string[] | undefined
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export async function createProgram(
  req: Request,
  res: Response
): Promise<void> {
  const program = await createProgramService(
    req.body
  );

  res.apiSuccess(
    program,
    "Program created successfully",
    201
  );
}

export async function getPrograms(
  req: Request,
  res: Response
): Promise<void> {
  const query =
    req.query as unknown as ProgramQueryDto;

  const result =
    await getProgramsService(query);

  res.apiSuccess(
    result,
    "Programs retrieved successfully"
  );
}

export async function getProgram(
  req: Request,
  res: Response
): Promise<void> {
  const programId = getSingleParam(
    req.params.id
  );

  const program =
    await getProgramService(programId);

  res.apiSuccess(
    program,
    "Program retrieved successfully"
  );
}

export async function updateProgram(
  req: Request,
  res: Response
): Promise<void> {
  const programId = getSingleParam(
    req.params.id
  );

  const program =
    await updateProgramService(
      programId,
      req.body
    );

  res.apiSuccess(
    program,
    "Program updated successfully"
  );
}

export async function deleteProgram(
  req: Request,
  res: Response
): Promise<void> {
  const programId = getSingleParam(
    req.params.id
  );

  await deleteProgramService(programId);

  res.apiSuccess(
    null,
    "Program deleted successfully"
  );
}