// import {
//   createApi,
//   fetchBaseQuery,
//   type BaseQueryFn,
//   type FetchArgs,
//   type FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";

// declare global {
//   interface ImportMeta {
//     readonly env: {
//       readonly VITE_API_BASE_URL?: string;
//       readonly [key: string]: string | undefined;
//     };
//   }
// }

// interface ApiSuccessResponse<T> {
//   success: true;
//   message: string;
//   data: T;
// }

// interface ApiErrorResponse {
//   success: false;
//   message: string;
//   code?: string;
//   details?: unknown;
// }

// type ApiResponse<T> =
//   | ApiSuccessResponse<T>
//   | ApiErrorResponse;

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl:
//     import.meta.env.VITE_API_BASE_URL ??
//     "http://localhost:8000/api/v1",

//   credentials: "include",

//   prepareHeaders: (headers) => {
//     headers.set("Content-Type", "application/json");

//     return headers;
//   },
// });

// const baseQueryWithProcessing: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const result = await rawBaseQuery(
//     args,
//     api,
//     extraOptions
//   );

//   if (result.error) {
//     return result;
//   }

//   const response =
//     result.data as ApiResponse<unknown>;

//   if (!response.success) {
//     return {
//       error: {
//         status: result.meta?.response?.status ?? 500,
//         data: response,
//       },
//     };
//   }

//   return {
//     data: response.data,
//     meta: result.meta,
//   };
// };

// export const baseApi = createApi({
//   reducerPath: "api",

//   baseQuery: baseQueryWithProcessing,

//   tagTypes: [
//     "Auth",
//     "User",
//     "Program",
//     "Course",
//     "Application",
//     "Dashboard",
//   ],

//   endpoints: () => ({}),
// });

// import {
//   createApi,
//   fetchBaseQuery,
//   type BaseQueryFn,
//   type FetchArgs,
//   type FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";

// declare global {
//   interface ImportMeta {
//     readonly env: {
//       readonly VITE_API_BASE_URL?: string;
//       readonly [key: string]: string | undefined;
//     };
//   }
// }

// interface ApiSuccessResponse<T> {
//   success: true;
//   message: string;
//   data: T;
// }

// interface ApiErrorResponse {
//   success: false;
//   message: string;
//   code?: string;
//   details?: unknown;
// }

// type ApiResponse<T> =
//   | ApiSuccessResponse<T>
//   | ApiErrorResponse;

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl:
//     import.meta.env.VITE_API_BASE_URL ??
//     "http://localhost:8000/api/v1",

//   credentials: "include",

//   prepareHeaders: (headers) => {
//     // Do NOT set Content-Type here.
//     //
//     // For JSON requests, fetchBaseQuery handles the
//     // content type automatically.
//     //
//     // For FormData requests, the browser must set:
//     // multipart/form-data; boundary=...
//     //
//     // Manually setting Content-Type would break the
//     // multipart boundary.

//     return headers;
//   },
// });

// const baseQueryWithProcessing: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const result = await rawBaseQuery(
//     args,
//     api,
//     extraOptions
//   );

//   // Network / HTTP error
//   if (result.error) {
//     return result;
//   }

//   const response =
//     result.data as ApiResponse<unknown>;

//   // Backend standardized error response
//   if (!response.success) {
//     return {
//       error: {
//         status:
//           result.meta?.response?.status ?? 500,
//         data: response,
//       },
//     };
//   }

//   // Unwrap backend:
//   // {
//   //   success: true,
//   //   message: "...",
//   //   data: ...
//   // }
//   //
//   // into RTK Query:
//   // data: ...
//   return {
//     data: response.data,
//     meta: result.meta,
//   };
// };

// export const baseApi = createApi({
//   reducerPath: "api",

//   baseQuery: baseQueryWithProcessing,

//   tagTypes: [
//     "Auth",
//     "User",
//     "Program",
//     "Course",
//     "Application",
//     "Dashboard",
//   ],

//   endpoints: () => ({}),
// });



// import {
//   createApi,
//   fetchBaseQuery,
//   type BaseQueryFn,
//   type FetchArgs,
//   type FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";

// declare global {
//   interface ImportMeta {
//     readonly env: {
//       readonly VITE_API_BASE_URL?: string;
//       readonly [key: string]: string | undefined;
//     };
//   }
// }

// interface ApiSuccessResponse<T> {
//   success: true;
//   message: string;
//   data: T;
// }

// interface ApiErrorResponse {
//   success: false;
//   message: string;
//   code?: string;
//   details?: unknown;
// }

// type ApiResponse<T> =
//   | ApiSuccessResponse<T>
//   | ApiErrorResponse;

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl:
//     import.meta.env.VITE_API_BASE_URL ??
//     "http://localhost:8000/api/v1",

//   credentials: "include",
// });

// const baseQueryWithProcessing: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const result = await rawBaseQuery(
//     args,
//     api,
//     extraOptions
//   );

//   if (result.error) {
//     return result;
//   }

//   const response =
//     result.data as ApiResponse<unknown>;

//   if (!response.success) {
//     return {
//       error: {
//         status:
//           result.meta?.response?.status ?? 500,
//         data: response,
//       },
//     };
//   }

//   return {
//     data: response.data,
//     meta: result.meta,
//   };
// };

// export const baseApi = createApi({
//   reducerPath: "api",

//   baseQuery: baseQueryWithProcessing,

//   tagTypes: [
//     "Auth",
//     "User",
//     "Program",
//     "Course",
//     "Application",
//     "Dashboard",
//   ],

//   endpoints: () => ({}),
// });


import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// declare global {
//   interface ImportMeta {
//     readonly env: {
//       readonly VITE_API_BASE_URL?: string;
//       readonly [key: string]: string | undefined;
//     };
//   }
// }

interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

const rawBaseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_API_BASE_URL ??
    "http://localhost:8000/api/v1",
  credentials: "include",
});

const baseQueryWithProcessing: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    return result;
  }

  // File endpoints return the actual file rather than
  // the normal { success, message, data } API envelope.
  if (result.data instanceof Blob) {
    return {
      data: result.data,
      meta: result.meta,
    };
  }

  const response = result.data as ApiResponse<unknown>;

  if (!response.success) {
    return {
      error: {
        status: result.meta?.response?.status ?? 500,
        data: response,
      },
    };
  }

  return {
    data: response.data,
    meta: result.meta,
  };
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithProcessing,
  tagTypes: [
    "Auth",
    "User",
    "Program",
    "Course",
    "Application",
    "Dashboard",
  ],
  endpoints: () => ({}),
});