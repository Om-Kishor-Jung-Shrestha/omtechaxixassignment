// import type {
//   DashboardApplicationStatsDto,
//   DashboardProgramStatsDto,
//   DashboardResponseDto,
//   DashboardUserStatsDto,
// } from "../dtos/dashboard.dtos";

// import type {
//   ApplicationStatsResult,
// } from "../services/dashboard/get-application-stats.service";

// import type {
//   ProgramStatsResult,
// } from "../services/dashboard/get-program-stats.service";

// import type {
//   UserStatsResult,
// } from "../services/dashboard/get-user-stats.service";

// export function toDashboardApplicationStatsDto(
//   stats: ApplicationStatsResult
// ): DashboardApplicationStatsDto {
//   return {
//     total: stats.total,
//     pending: stats.pending,
//     underReview: stats.underReview,
//     approved: stats.approved,
//     rejected: stats.rejected,
//   };
// }

// export function toDashboardProgramStatsDto(
//   stats: ProgramStatsResult
// ): DashboardProgramStatsDto {
//   return {
//     total: stats.total,
//   };
// }

// export function toDashboardUserStatsDto(
//   stats: UserStatsResult
// ): DashboardUserStatsDto {
//   return {
//     total: stats.total,
//   };
// }

// export function toDashboardResponseDto(
//   applications: DashboardApplicationStatsDto,
//   programs: DashboardProgramStatsDto,
//   users: DashboardUserStatsDto
// ): DashboardResponseDto {
//   return {
//     applications,
//     programs,
//     users,
//   };
// }

import type {
  DashboardApplicationStatsDto,
  DashboardProgramStatsDto,
  DashboardResponseDto,
  DashboardUserStatsDto,
} from "../dtos/dashboard.dtos";

import type {
  ApplicationStatsResult,
} from "../services/dashboard/get-application-stats.service";

import type {
  ProgramStatsResult,
} from "../services/dashboard/get-program-stats.service";

import type {
  UserStatsResult,
} from "../services/dashboard/get-user-stats.service";

export function toDashboardApplicationStatsDto(
  stats: ApplicationStatsResult
): DashboardApplicationStatsDto {
  return {
    total: stats.total,
    pending: stats.pending,
    underReview: stats.underReview,
    approved: stats.approved,
    rejected: stats.rejected,
  };
}

export function toDashboardProgramStatsDto(
  stats: ProgramStatsResult
): DashboardProgramStatsDto {
  return {
    total: stats.total,
  };
}

export function toDashboardUserStatsDto(
  stats: UserStatsResult
): DashboardUserStatsDto {
  const userStats: DashboardUserStatsDto = {
    total: stats.total,
  };

  return userStats;
}

export function toDashboardResponseDto(
  applications: DashboardApplicationStatsDto,
  programs?: DashboardProgramStatsDto,
  users?: DashboardUserStatsDto
): DashboardResponseDto {
  return {
    applications,
    ...(programs && { programs }),
    ...(users && { users }),
  };
}