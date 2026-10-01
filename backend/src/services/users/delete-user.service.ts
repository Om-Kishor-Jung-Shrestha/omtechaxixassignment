import UserModel from "../../models/user.model";
import { AppError } from "../../errors/app.error";

export async function deleteUserService(
  id: string,
  actorId: string
): Promise<void> {
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
      "You cannot delete your own account",
      403,
      "SELF_DELETE_NOT_ALLOWED"
    );
  }

  if (user.role === "superadmin") {
    throw new AppError(
      "Superadmin account cannot be deleted",
      403,
      "SUPERADMIN_PROTECTED"
    );
  }

  await user.deleteOne();
}