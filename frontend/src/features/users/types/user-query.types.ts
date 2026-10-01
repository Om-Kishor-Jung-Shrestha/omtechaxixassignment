import type {
  AuthProvider,
  UserRole,
  UserStatus,
} from "@/types/user.types";
import type { PaginationQueryDto } from "@/types/pagination.types";

export interface UserQueryDto extends PaginationQueryDto {
  role?: UserRole;
  status?: UserStatus;
  authProvider?: AuthProvider;
  isVerified?: boolean;
  courseId?: string;
}