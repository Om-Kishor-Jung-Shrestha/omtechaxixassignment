import UserModel from "../../models/user.model";
import { AppError } from "../../errors/app.error";
import {
  toUserManagementResponseDto,
} from "../../mapper/user.mapper";
import type { UpdateUserStatusDto } from "../../dtos/update-user-status.dtos";

export async function updateUserStatusService(
  id: string,
  dto: UpdateUserStatusDto
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

  if (user.role === "superadmin") {
    throw new AppError(
      "Superadmin status cannot be changed",
      403,
      "SUPERADMIN_PROTECTED"
    );
  }

  user.status = dto.status;

  await user.save();

  return toUserManagementResponseDto(user);
}