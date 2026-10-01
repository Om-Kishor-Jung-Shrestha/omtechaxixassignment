import type { IUser } from "../models/user.model";

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
  role: IUser["role"];
  status: IUser["status"];
  isVerified: boolean;
  authProvider: IUser["authProvider"];
  providerLinked: boolean;
  courses: Array<{
    courseId: string;
  }>;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}