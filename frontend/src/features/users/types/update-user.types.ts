
import type {
  UserRole,
  UserStatus,
} from "@/types/user.types";

/**
 * User ID route parameter
 *
 * Used by:
 * GET /users/:id
 * PATCH /users/:id/status
 * PATCH /users/:id/role
 * DELETE /users/:id
 */
export interface UserIdParamDto {
  id: string;
}

/**
 * Update User Status
 *
 * Used by:
 * PATCH /users/:id/status
 */
export interface UpdateUserStatusDto {
  status: UserStatus;
}

/**
 * Update User Role
 *
 * Used by:
 * PATCH /users/:id/role
 *
 * Currently retained for the existing backend endpoint.
 * The User Management page does not need to use this yet.
 */
export interface UpdateUserRoleDto {
  role: UserRole;
}
