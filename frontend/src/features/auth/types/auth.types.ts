// import type {
//   UserRole,
//   UserStatus,
//   AuthProvider,
// } from "@/types/user.types";

// export interface LoginDto {
//   email: string;
//   password: string;
// }

// export interface UserResponseDto {
//   id: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   email: string;
//   avatar: {
//     public_id: string;
//     url: string;
//   };
//   role: UserRole;
//   status: UserStatus;
//   isVerified: boolean;
//   authProvider: AuthProvider;
//   providerLinked: boolean;
//   courses: Array<{
//     courseId: string;
//   }>;
//   lastLogin?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AuthResponseDto {
//   token: string;
//   user: UserResponseDto;
// }

import type {
  UserRole,
  UserStatus,
  AuthProvider,
} from "@/types/user.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserResponseDto {
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

  courses: Array<{
    courseId: string;
  }>;

  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
}
