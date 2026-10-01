
import { baseApi } from "@/services/base-api";

import type {
  DashboardResponse,
} from "../types/dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────────────────────────────────────
    // GET DASHBOARD
    // GET /dashboard
    // ─────────────────────────────────────────────
    getDashboard: builder.query<
      DashboardResponse,
      void
    >({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),

      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useLazyGetDashboardQuery,
} = dashboardApi;
