import { baseApi } from "@/services/base-api";

import type {
  PublicCourseDetails,
  PublicProgramCatalogQuery,
  PublicProgramCatalogResponse,
} from "../types/public-program-catalog.types";

export const publicProgramCatalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicProgramCatalog: builder.query<
      PublicProgramCatalogResponse,
      PublicProgramCatalogQuery | void
    >({
      query: (params) => ({
        url: "/public/catalog/programs",
        method: "GET",
        params: params ?? undefined,
      }),
    }),

    getPublicCourseDetails: builder.query<
      PublicCourseDetails,
      string
    >({
      query: (id) => ({
        url: `/public/catalog/programs/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPublicProgramCatalogQuery,
  useGetPublicCourseDetailsQuery,
} = publicProgramCatalogApi;