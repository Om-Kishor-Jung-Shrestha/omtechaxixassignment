
import { Request, Response } from "express";

// import { getUsersService } from "../services/user/get-users.service";
// import { getUserService } from "../services/user/get-user.service";
// import { updateUserStatusService } from "../services/user/update-user-status.service";
// import { updateUserRoleService } from "../services/user/update-user-role.service";
// import { deleteUserService } from "../services/user/delete-user.service";

import type { UserQueryDto } from "../dtos/user-query.dtos";
import type { UpdateUserStatusDto } from "../dtos/update-user-status.dtos";
import type { UpdateUserRoleDto } from "../dtos/update-user-role.dtos";
import { getUsersService } from "../services/users/get-users.service";
import { getUserService } from "../services/users/get-user.service";
import { updateUserStatusService } from "../services/users/update-user-status.service";
import { updateUserRoleService } from "../services/users/update-user-role.service";
import { deleteUserService } from "../services/users/delete-user.service";

function getSingleParam(
  value: string | string[] | undefined
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

// export async function getUsers(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const query = req.query as unknown as UserQueryDto;

//   const result = await getUsersService(query);

//   res.apiSuccess(
//     result,
//     "Users retrieved successfully"
//   );
// }

// export async function getUser(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const userId = getSingleParam(req.params.id);

//   const user = await getUserService(userId);

//   res.apiSuccess(
//     user,
//     "User retrieved successfully"
//   );
// }



export async function getUsers(
  req: Request,
  res: Response
): Promise<void> {
  const actorRole = req.user?.role;

  if (!actorRole) {
    res.apiError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
    return;
  }

  const query = req.query as unknown as UserQueryDto;

  const result = await getUsersService(
    query,
    actorRole
  );

  res.apiSuccess(
    result,
    "Users retrieved successfully"
  );
}

export async function getUser(
  req: Request,
  res: Response
): Promise<void> {
  const actorRole = req.user?.role;

  if (!actorRole) {
    res.apiError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
    return;
  }

  const userId = getSingleParam(req.params.id);

  const user = await getUserService(
    userId,
    actorRole
  );

  res.apiSuccess(
    user,
    "User retrieved successfully"
  );
}


export async function updateUserStatus(
  req: Request,
  res: Response
): Promise<void> {
  const userId = getSingleParam(req.params.id);

  const result = await updateUserStatusService(
    userId,
    req.body as UpdateUserStatusDto
  );

  res.apiSuccess(
    result,
    "User status updated successfully"
  );
}

export async function updateUserRole(
  req: Request,
  res: Response
): Promise<void> {
  const userId = getSingleParam(req.params.id);

  const actorId = req.user?._id.toString();

  if (!actorId) {
    res.apiError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
    return;
  }

  const result = await updateUserRoleService(
    userId,
    req.body as UpdateUserRoleDto,
    actorId
  );

  res.apiSuccess(
    result,
    "User role updated successfully"
  );
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<void> {
  const userId = getSingleParam(req.params.id);

  const actorId = req.user?._id.toString();

  if (!actorId) {
    res.apiError(
      "Authentication required",
      401,
      "AUTHENTICATION_REQUIRED"
    );
    return;
  }

  await deleteUserService(
    userId,
    actorId
  );

  res.apiSuccess(
    null,
    "User deleted successfully"
  );
}
