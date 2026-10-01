// import type { UserRole, UserStatus, AuthProvider } from "@/types/user.types";

// import type { AuthProvider, UserRole, UserStatus } from "../../../types/user.types";

// export interface UserManagementResponseDto {
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
// // }




// import type {
//   UserRole,
//   UserStatus,
//   AuthProvider,
// } from "@/types/user.types";

// export interface UserManagementResponseDto {
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



import type {
  UserRole,
  UserStatus,
  AuthProvider,
} from "@/types/user.types";

export interface UserManagementResponseDto {
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

export interface UserPaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserManagementPaginatedResponse {
  items: UserManagementResponseDto[];
  pagination: UserPaginationMeta;
}
