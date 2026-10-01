import type { IUser } from "../models/user.model";
import type { UserProfileResponseDto } from "../dtos/user-profile.dtos";

// export const toUserProfileResponseDto = (
//   user: IUser
// ): UserProfileResponseDto => ({
//   id: user._id.toString(),

//   firstName: user.firstName,

//   middleName: user.middleName || undefined,

//   lastName: user.lastName,

//   email: user.email,

//   avatar: {
//     public_id: user.avatar.public_id,
//     url: user.avatar.url,
//   },

//   role: user.role,

//   status: user.status,

//   isVerified: user.isVerified,

//   authProvider: user.authProvider,

//   providerLinked: user.providerLinked,

//   courses: user.courses.map((course) => ({
//     courseId: course.courseId,
//   })),

//   lastLogin: user.lastLogin
//     ? user.lastLogin.toISOString()
//     : undefined,

//   createdAt: user.createdAt.toISOString(),

//   updatedAt: user.updatedAt.toISOString(),
// });


export const toUserProfileResponseDto = (
  user: IUser
): UserProfileResponseDto => ({
  id: user._id.toString(),

  firstName: user.firstName,

  middleName: user.middleName || undefined,

  lastName: user.lastName,

  email: user.email,

  avatar: {
    public_id: user.avatar.public_id,
    url: user.avatar.url,
  },

  role: user.role,

  status: user.status,

  isVerified: user.isVerified,

  authProvider: user.authProvider,

  providerLinked: user.providerLinked,

  hasPassword: Boolean(user.password),

  courses: user.courses.map((course) => ({
    courseId: course.courseId,
  })),

  lastLogin: user.lastLogin
    ? user.lastLogin.toISOString()
    : undefined,

  createdAt: user.createdAt.toISOString(),

  updatedAt: user.updatedAt.toISOString(),
});