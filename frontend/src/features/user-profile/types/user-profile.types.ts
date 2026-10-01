import type {
  AuthProvider,
  UserRole,
  UserStatus,
} from "@/types/user.types";

export interface UserProfileResponseDto {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;

  avatar: {
    public_id: string;
    url: string;
  };

  role: UserRole;
  status: UserStatus;
  isVerified: boolean;

  authProvider: AuthProvider;
  providerLinked: boolean;

  hasPassword: boolean;

  courses: Array<{
    courseId: string;
  }>;

  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
}

export interface SetUserPasswordDto {
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeUserPasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}