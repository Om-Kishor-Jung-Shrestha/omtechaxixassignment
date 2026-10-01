
import { baseApi } from "@/services/base-api";

import type {
  ApplicationResponseDto,
  PaginatedApplicationsResponseDto,
//   CreateApplicationDto,
//   UpdateApplicationDto,
  UpdateStatusDto,
  ListApplicationsQueryDto,
  ApplicationIdParamDto,
} from "../types/application.types";

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────────────────────────────────────
    // GET ALL APPLICATIONS
    // GET /applications
    // ─────────────────────────────────────────────
    getApplications: builder.query<
      PaginatedApplicationsResponseDto,
      ListApplicationsQueryDto | void
    >({
      query: (params) => ({
        url: "/applications",
        method: "GET",
        params: params ?? undefined,
      }),

      providesTags: (result) =>
        result
          ? [
              "Application",
              ...result.data.map((application) => ({
                type: "Application" as const,
                id: application.id,
              })),
            ]
          : ["Application"],
    }),

    // ─────────────────────────────────────────────
    // GET SINGLE APPLICATION
    // GET /applications/:id
    // ─────────────────────────────────────────────
    getApplication: builder.query<
      ApplicationResponseDto,
      ApplicationIdParamDto
    >({
      query: ({ id }) => ({
        url: `/applications/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, { id }) => [
        {
          type: "Application",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // CREATE APPLICATION
    // POST /applications
    //
    // Backend expects multipart/form-data.
    // ─────────────────────────────────────────────
    createApplication: builder.mutation<
      ApplicationResponseDto,
      FormData
    >({
      query: (formData) => ({
        url: "/applications",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: ["Application"],
    }),

    // ─────────────────────────────────────────────
    // UPDATE APPLICATION
    // PATCH /applications/:id
    //
    // Backend expects multipart/form-data.
    // ─────────────────────────────────────────────
    updateApplication: builder.mutation<
      ApplicationResponseDto,
      {
        id: string;
        formData: FormData;
      }
    >({
      query: ({ id, formData }) => ({
        url: `/applications/${id}`,
        method: "PATCH",
        body: formData,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Application",
        {
          type: "Application",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // UPDATE APPLICATION STATUS
    // PATCH /applications/:id/status
    // ─────────────────────────────────────────────
    updateApplicationStatus: builder.mutation<
      ApplicationResponseDto,
      ApplicationIdParamDto & UpdateStatusDto
    >({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Application",
        {
          type: "Application",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // DELETE APPLICATION
    // DELETE /applications/:id
    // ─────────────────────────────────────────────
    deleteApplication: builder.mutation<
      null,
      ApplicationIdParamDto
    >({
      query: ({ id }) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, { id }) => [
        "Application",
        {
          type: "Application",
          id,
        },
      ],
    }),

    // ─────────────────────────────────────────────
    // GET APPLICATION FILE
    // GET /applications/:id/files/:field
    //
    // Backend returns the actual file, not JSON.
    // ─────────────────────────────────────────────
    getApplicationFile: builder.query<
      Blob,
      {
        id: string;
        field:
          | "citizenship"
          | "cover"
          | "characterCertificate"
          | "document"
          | "marksheet12"
          | "applicantImage";
      }
    >({
      query: ({ id, field }) => ({
        url: `/applications/${id}/files/${field}`,
        method: "GET",
        responseHandler: async (response) =>
          response.blob(),
      }),

      providesTags: (_result, _error, { id }) => [
        {
          type: "Application",
          id,
        },
      ],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useLazyGetApplicationsQuery,

  useGetApplicationQuery,
  useLazyGetApplicationQuery,

  useCreateApplicationMutation,

  useUpdateApplicationMutation,

  useUpdateApplicationStatusMutation,

  useDeleteApplicationMutation,

  useGetApplicationFileQuery,
  useLazyGetApplicationFileQuery,
} = applicationsApi;
