// import { baseApi } from "@/services/base-api";

// import type {
//   ChangeUserPasswordDto,
//   SetUserPasswordDto,
//   UpdateUserProfileDto,
//   UserProfileResponseDto,
// } from "../types/user-profile.types";

// export const userProfileApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getUserProfile: builder.query<UserProfileResponseDto, void>({
//       query: () => ({
//         url: "/users/profile",
//         method: "GET",
//       }),
//       providesTags: ["User"],
//     }),

//     updateUserProfile: builder.mutation<
//       UserProfileResponseDto,
//       UpdateUserProfileDto
//     >({
//       query: (body) => ({
//         url: "/users/profile",
//         method: "PATCH",
//         body,
//       }),
//       invalidatesTags: ["User", "Auth"],
//     }),

//     setUserPassword: builder.mutation<
//       UserProfileResponseDto,
//       SetUserPasswordDto
//     >({
//       query: (body) => ({
//         url: "/users/profile/password/set",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["User", "Auth"],
//     }),

//     changeUserPassword: builder.mutation<
//       UserProfileResponseDto,
//       ChangeUserPasswordDto
//     >({
//       query: (body) => ({
//         url: "/users/profile/password/change",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["User", "Auth"],
//     }),
//   }),
// }),



//     uploadUserAvatar: builder.mutation<
//       UserProfileResponseDto,
//       File
//     >({
//       query: (file) => {
//         const formData = new FormData();

//         formData.append("avatar", file);

//         return {
//           url: "/users/profile/avatar",
//           method: "POST",
//           body: formData,
//         };
//       },
//       invalidatesTags: ["User", "Auth"],
//     });


// export const {
//   useGetUserProfileQuery,
//   useUpdateUserProfileMutation,
//   useSetUserPasswordMutation,
//   useUploadUserAvatarMutation,
//   useChangeUserPasswordMutation,
// } = userProfileApi;



import { baseApi } from "@/services/base-api";

import type {
  ChangeUserPasswordDto,
  SetUserPasswordDto,
  UpdateUserProfileDto,
  UserProfileResponseDto,
} from "../types/user-profile.types";

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponseDto, void>({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: builder.mutation<
      UserProfileResponseDto,
      UpdateUserProfileDto
    >({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    uploadUserAvatar: builder.mutation<
      UserProfileResponseDto,
      File
    >({
      query: (file) => {
        const formData = new FormData();

        formData.append("avatar", file);

        return {
          url: "/users/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["User", "Auth"],
    }),

    setUserPassword: builder.mutation<
      UserProfileResponseDto,
      SetUserPasswordDto
    >({
      query: (body) => ({
        url: "/users/profile/password/set",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Auth"],
    }),

    changeUserPassword: builder.mutation<
      UserProfileResponseDto,
      ChangeUserPasswordDto
    >({
      query: (body) => ({
        url: "/users/profile/password/change",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Auth"],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUploadUserAvatarMutation,
  useSetUserPasswordMutation,
  useChangeUserPasswordMutation,
} = userProfileApi;