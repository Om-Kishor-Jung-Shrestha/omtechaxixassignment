import UserModel from "../../models/user.model";
import { AppError } from "../../errors/app.error";
import {
  toUserManagementResponseDto,
} from "../../mapper/user.mapper";
import type { UpdateUserRoleDto } from "../../dtos/update-user-role.dtos";

export async function updateUserRoleService(
  id: string,
  dto: UpdateUserRoleDto,
  actorId: string
): Promise<
  ReturnType<typeof toUserManagementResponseDto>
> {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  if (user._id.toString() === actorId) {
    throw new AppError(
      "You cannot change your own role",
      403,
      "SELF_ROLE_CHANGE_NOT_ALLOWED"
    );
  }

  if (user.role === "superadmin") {
    throw new AppError(
      "Superadmin role cannot be changed",
      403,
      "SUPERADMIN_PROTECTED"
    );
  }

  user.role = dto.role;

  await user.save();

  return toUserManagementResponseDto(user);
}