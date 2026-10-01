// import {
//   toDashboardApplicationStatsDto,
//   toDashboardProgramStatsDto,
//   toDashboardResponseDto,
//   toDashboardUserStatsDto,
// } from "../../mapper/dashboard.mapper";

// import { getApplicationStatsService } from "./get-application-stats.service";
// import { getProgramStatsService } from "./get-program-stats.service";
// import { getUserStatsService } from "./get-user-stats.service";

// export async function getDashboardService() {
//   const [
//     applicationStats,
//     programStats,
//     userStats,
//   ] = await Promise.all([
//     getApplicationStatsService(),
//     getProgramStatsService(),
//     getUserStatsService(),
//   ]);

//   const applications =
//     toDashboardApplicationStatsDto(
//       applicationStats
//     );

//   const programs =
//     toDashboardProgramStatsDto(
//       programStats
//     );

//   const users =
//     toDashboardUserStatsDto(
//       userStats
//     );

//   return toDashboardResponseDto(
//     applications,
//     programs,
//     users
//   );
// }

import {
  toDashboardApplicationStatsDto,
  toDashboardProgramStatsDto,
  toDashboardResponseDto,
  toDashboardUserStatsDto,
} from "../../mapper/dashboard.mapper";

import { getApplicationStatsService } from "./get-application-stats.service";
import { getProgramStatsService } from "./get-program-stats.service";
import { getUserStatsService } from "./get-user-stats.service";

export async function getDashboardService(
  role: "user" | "admin" | "superadmin"
) {
  /*
   * Application statistics are available
   * to every authenticated dashboard role.
   */
  const applicationStats =
    await getApplicationStatsService();

  const applications =
    toDashboardApplicationStatsDto(
      applicationStats
    );

  /*
   * Admission counselor (`user`)
   *
   * Only application statistics are returned.
   */
  if (role === "user") {
    return toDashboardResponseDto(
      applications
    );
  }

  /*
   * Admin and superadmin
   *
   * These roles can also see system-wide
   * program and user statistics.
   */
  const [
    programStats,
    userStats,
  ] = await Promise.all([
    getProgramStatsService(),
    getUserStatsService(),
  ]);

  const programs =
    toDashboardProgramStatsDto(
      programStats
    );

  const users =
    toDashboardUserStatsDto(
      userStats
    );

  return toDashboardResponseDto(
    applications,
    programs,
    users
  );
}