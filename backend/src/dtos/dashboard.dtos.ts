// import type {
//   ApplicationStatus,
// } from "../models/application.model";

// // export interface DashboardApplicationStatsDto {
// //   total: number;
// //   pending: number;
// //   underReview: number;
// //   approved: number;
// //   rejected: number;
// // }

// // export interface DashboardProgramStatsDto {
// //   total: number;
// // }

// // export interface DashboardUserStatsDto {
// //   total: number;
// // }

// // export interface DashboardResponseDto {
// //   applications: DashboardApplicationStatsDto;
// //   programs: DashboardProgramStatsDto;
// //   users: DashboardUserStatsDto;
// // }

// export interface DashboardStatusCount {
//   status: ApplicationStatus;
//   count: number;
// }

// export interface DashboardApplicationStatsDto {
//   total: number;
//   pending: number;
//   underReview: number;
//   approved: number;
//   rejected: number;
// }

// export interface DashboardProgramStatsDto {
//   total: number;
// }

// export interface DashboardUserStatsDto {
//   total: number;
// }

// export interface DashboardResponseDto {
//   applications: DashboardApplicationStatsDto;
//   programs: DashboardProgramStatsDto;
//   users: DashboardUserStatsDto;
// }
import type {
  ApplicationStatus,
} from "../models/application.model";

export interface DashboardStatusCount {
  status: ApplicationStatus;
  count: number;
}

export interface DashboardApplicationStatsDto {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export interface DashboardProgramStatsDto {
  total: number;
}

export interface DashboardUserStatsDto {
  total: number;
}

export interface DashboardResponseDto {
  applications: DashboardApplicationStatsDto;
  programs?: DashboardProgramStatsDto;
  users?: DashboardUserStatsDto;
}