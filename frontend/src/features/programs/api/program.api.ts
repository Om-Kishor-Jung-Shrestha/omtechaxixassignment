
// import { baseApi } from "@/services/base-api";

// import type {
//   ProgramResponseDto,
//   CreateProgramDto,
//   UpdateProgramDto,
//   ProgramIdParamDto,
// } from "../types/program.types";

// import type {
//   ProgramQueryDto,
// } from "../types/program-query.types";

// export const programsApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ─────────────────────────────────────────────
//     // GET ALL PROGRAMS
//     // GET /programs
//     // ─────────────────────────────────────────────
//     getPrograms: builder.query<
//       ProgramResponseDto[],
//       ProgramQueryDto | void
//     >({
//       query: (params) => ({
//         url: "/programs",
//         method: "GET",
//         params: params ?? undefined,
//       }),

//       providesTags: ["Program"],
//     }),

//     // ─────────────────────────────────────────────
//     // GET SINGLE PROGRAM
//     // GET /programs/:id
//     // ─────────────────────────────────────────────
//     getProgram: builder.query<
//       ProgramResponseDto,
//       ProgramIdParamDto
//     >({
//       query: ({ id }) => ({
//         url: `/programs/${id}`,
//         method: "GET",
//       }),

//       providesTags: (_result, _error, { id }) => [
//         {
//           type: "Program",
//           id,
//         },
//       ],
//     }),

//     // ─────────────────────────────────────────────
//     // CREATE PROGRAM
//     // POST /programs
//     // ─────────────────────────────────────────────
//     createProgram: builder.mutation<
//       ProgramResponseDto,
//       CreateProgramDto
//     >({
//       query: (body) => ({
//         url: "/programs",
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["Program"],
//     }),

//     // ─────────────────────────────────────────────
//     // UPDATE PROGRAM
//     // PATCH /programs/:id
//     // ─────────────────────────────────────────────
//     updateProgram: builder.mutation<
//       ProgramResponseDto,
//       ProgramIdParamDto & UpdateProgramDto
//     >({
//       query: ({ id, ...body }) => ({
//         url: `/programs/${id}`,
//         method: "PATCH",
//         body,
//       }),

//       invalidatesTags: (_result, _error, { id }) => [
//         "Program",
//         {
//           type: "Program",
//           id,
//         },
//       ],
//     }),

//     // ─────────────────────────────────────────────
//     // DELETE PROGRAM
//     // DELETE /programs/:id
//     // ─────────────────────────────────────────────
//     deleteProgram: builder.mutation<
//       null,
//       ProgramIdParamDto
//     >({
//       query: ({ id }) => ({
//         url: `/programs/${id}`,
//         method: "DELETE",
//       }),

//       invalidatesTags: ["Program"],
//     }),
//   }),
// });

// export const {
//   useGetProgramsQuery,
//   useLazyGetProgramsQuery,
//   useGetProgramQuery,
//   useLazyGetProgramQuery,
//   useCreateProgramMutation,
//   useUpdateProgramMutation,
//   useDeleteProgramMutation,
// } = programsApi;



import { baseApi } from "@/services/base-api";

import type {
  CreateProgramDto,
  ProgramIdParamDto,
  ProgramListResponseDto,
  ProgramResponseDto,
  UpdateProgramDto,
} from "../types/program.types";

import type { ProgramQueryDto } from "../types/program-query.types";

export const programsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<
      ProgramListResponseDto,
      ProgramQueryDto | void
    >({
      query: (params) => ({
        url: "/programs",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Program"],
    }),

    getProgram: builder.query<
      ProgramResponseDto,
      ProgramIdParamDto
    >({
      query: ({ id }) => ({
        url: `/programs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [
        { type: "Program", id },
      ],
    }),

    createProgram: builder.mutation<
      ProgramResponseDto,
      CreateProgramDto
    >({
      query: (body) => ({
        url: "/programs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Program"],
    }),

    updateProgram: builder.mutation<
      ProgramResponseDto,
      ProgramIdParamDto & UpdateProgramDto
    >({
      query: ({ id, ...body }) => ({
        url: `/programs/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Program",
        { type: "Program", id },
      ],
    }),

    deleteProgram: builder.mutation<
      null,
      ProgramIdParamDto
    >({
      query: ({ id }) => ({
        url: `/programs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Program"],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useLazyGetProgramsQuery,
  useGetProgramQuery,
  useLazyGetProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programsApi;