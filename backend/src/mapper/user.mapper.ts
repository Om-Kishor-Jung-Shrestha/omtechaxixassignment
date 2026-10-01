import {
  AuthResponseDto,
  UserResponseDto,
} from "../dtos/auth.dtos";

import { IUser } from "../models/user.model";
import type { UserManagementResponseDto } from "../dtos/user.dtos";


export const toUserResponseDto = (
  user: IUser
): UserResponseDto => ({
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

  courses: user.courses.map((course) => ({
    courseId: course.courseId,
  })),

  lastLogin: user.lastLogin
    ? user.lastLogin.toISOString()
    : undefined,

  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});

export const toAuthResponseDto = (
  token: string,
  user: IUser
): AuthResponseDto => ({
  token,
  user: toUserResponseDto(user),
});

export const toUserManagementResponseDto = (
  user: IUser
): UserManagementResponseDto => ({
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
  courses: user.courses.map((course) => ({
    courseId: course.courseId,
  })),
  lastLogin: user.lastLogin
    ? user.lastLogin.toISOString()
    : undefined,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString(),
});