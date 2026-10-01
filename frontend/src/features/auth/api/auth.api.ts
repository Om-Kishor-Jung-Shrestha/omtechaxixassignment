// import { baseApi } from "@/services/base-api";

// import type {
//   LoginDto,
//   AuthResponseDto,
// } from "../types/auth.types";

// export interface RegisterRequest {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// export interface VerifyOtpRequest {
//   email: string;
//   otp: string;
// }

// export interface GoogleSpaRequest {
//   idToken: string;
// }

// export interface LinkGoogleRequest {
//   idToken: string;
// }

// export interface ForgotPasswordRequest {
//   email: string;
// }

// export interface ResetPasswordRequest {
//   email: string;
//   otp: string;
//   newPassword: string;
// }

// export interface AcceptInviteRequest {
//   token: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   password: string;
// }

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation<
//       null,
//       RegisterRequest
//     >({
//       query: (body) => ({
//         url: "/auth/register",
//         method: "POST",
//         body,
//       }),
//     }),

//     verifyOtp: builder.mutation<
//       AuthResponseDto,
//       VerifyOtpRequest
//     >({
//       query: (body) => ({
//         url: "/auth/verify-otp",
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["Auth"],
//     }),

//     login: builder.mutation<
//       AuthResponseDto,
//       LoginDto
//     >({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["Auth"],
//     }),

//     googleSpa: builder.mutation<
//       AuthResponseDto,
//       GoogleSpaRequest
//     >({
//       query: (body) => ({
//         url: "/auth/google/spa",
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["Auth"],
//     }),

//     linkGoogle: builder.mutation<
//       null,
//       LinkGoogleRequest
//     >({
//       query: (body) => ({
//         url: "/auth/google/link",
//         method: "POST",
//         body,
//       }),
//     }),

//     refresh: builder.mutation<
//       AuthResponseDto,
//       void
//     >({
//       query: () => ({
//         url: "/auth/refresh",
//         method: "POST",
//       }),

//       invalidatesTags: ["Auth"],
//     }),

//     logout: builder.mutation<
//       null,
//       void
//     >({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),

//       invalidatesTags: ["Auth"],
//     }),

//     forgotPassword: builder.mutation<
//       null,
//       ForgotPasswordRequest
//     >({
//       query: (body) => ({
//         url: "/auth/forgot-password",
//         method: "POST",
//         body,
//       }),
//     }),

//     resetPassword: builder.mutation<
//       null,
//       ResetPasswordRequest
//     >({
//       query: (body) => ({
//         url: "/auth/reset-password",
//         method: "POST",
//         body,
//       }),
//     }),

//     acceptInvite: builder.mutation<
//       AuthResponseDto,
//       AcceptInviteRequest
//     >({
//       query: (body) => ({
//         url: "/auth/accept-invite",
//         method: "POST",
//         body,
//       }),

//       invalidatesTags: ["Auth"],
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useVerifyOtpMutation,
//   useLoginMutation,
//   useGoogleSpaMutation,
//   useLinkGoogleMutation,
//   useRefreshMutation,
//   useLogoutMutation,
//   useForgotPasswordMutation,
//   useResetPasswordMutation,
//   useAcceptInviteMutation,
// } = authApi;


import { baseApi } from "@/services/base-api";

import type {
  LoginDto,
  AuthResponseDto,
} from "../types/auth.types";

export interface RegisterRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface GoogleSpaRequest {
  idToken: string;
}

export interface LinkGoogleRequest {
  idToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AcceptInviteRequest {
  token: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      null,
      RegisterRequest
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<
      AuthResponseDto,
      VerifyOtpRequest
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation<
      AuthResponseDto,
      LoginDto
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    googleSpa: builder.mutation<
      AuthResponseDto,
      GoogleSpaRequest
    >({
      query: (body) => ({
        url: "/auth/google/spa",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    linkGoogle: builder.mutation<
      null,
      LinkGoogleRequest
    >({
      query: (body) => ({
        url: "/auth/google/link",
        method: "POST",
        body,
      }),
    }),

    refresh: builder.mutation<
      AuthResponseDto,
      void
    >({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<
      null,
      void
    >({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    forgotPassword: builder.mutation<
      null,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      null,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    acceptInvite: builder.mutation<
      AuthResponseDto,
      AcceptInviteRequest
    >({
      query: (body) => ({
        url: "/auth/accept-invite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useGoogleSpaMutation,
  useLinkGoogleMutation,
  useRefreshMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAcceptInviteMutation,
} = authApi;
