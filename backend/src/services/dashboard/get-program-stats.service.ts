import ProgramModel from "../../models/program.model";

export interface ProgramStatsResult {
  total: number;
}

export async function getProgramStatsService(): Promise<ProgramStatsResult> {
  const total = await ProgramModel.countDocuments();

  return {
    total,
  };
}