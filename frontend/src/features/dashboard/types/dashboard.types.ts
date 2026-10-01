// src/types/dashboard.types.ts

import type { ApplicationStatus } from "@/types/application.types";

export interface DashboardStatusCount {
  status: ApplicationStatus;
  count: number;
}

export interface DashboardApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export interface DashboardProgramStats {
  total: number;
}

export interface DashboardUserStats {
  total: number;
}

export interface DashboardResponse {
  applications: DashboardApplicationStats;
  programs: DashboardProgramStats;
  users: DashboardUserStats;
}