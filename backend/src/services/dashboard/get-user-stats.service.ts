import UserModel from "../../models/user.model";

export interface UserStatsResult {
  total: number;
}

export async function getUserStatsService(): Promise<UserStatsResult> {
  const total = await UserModel.countDocuments();

  return {
    total,
  };
}