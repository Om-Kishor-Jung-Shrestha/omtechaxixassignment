import type { UserRole } from "@/types/user.types";

export interface InviteUserDto {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: UserRole;
}