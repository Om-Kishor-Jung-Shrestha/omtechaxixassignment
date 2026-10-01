import ApplicationModel from "../../models/application.model";

export interface ApplicationStatsResult {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export async function getApplicationStatsService(): Promise<ApplicationStatsResult> {
  const [
    total,
    pending,
    underReview,
    approved,
    rejected,
  ] = await Promise.all([
    ApplicationModel.countDocuments(),

    ApplicationModel.countDocuments({
      status: "pending",
    }),

    ApplicationModel.countDocuments({
      status: "under_review",
    }),

    ApplicationModel.countDocuments({
      status: "approved",
    }),

    ApplicationModel.countDocuments({
      status: "rejected",
    }),
  ]);

  return {
    total,
    pending,
    underReview,
    approved,
    rejected,
  };
}