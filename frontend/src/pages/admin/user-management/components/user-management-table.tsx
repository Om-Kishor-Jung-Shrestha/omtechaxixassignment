
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Eye,
  Loader2,
} from "lucide-react";

// import type { UserManagementResponseDto } from "../../types/user.types";
import type {
  UserRole,
  UserStatus,
} from "@/types/user.types";

import { UserStatusAction } from "./user-status-action";
import { UserManagementResponseDto } from "@/features/users/types/user.types";

type SortField =
  | "firstName"
  | "lastName"
  | "email"
  | "role"
  | "status"
  | "lastLogin"
  | "createdAt"
  | "updatedAt";

type SortOrder = "asc" | "desc";

interface UserManagementTableProps {
  users: UserManagementResponseDto[];
  isLoading?: boolean;
  isFetching?: boolean;
  sortBy: SortField;
  sortOrder: SortOrder;
  updatingUserId?: string;

  onSortChange: (
    sortBy: SortField,
    sortOrder: SortOrder
  ) => void;

  onStatusChange: (
    user: UserManagementResponseDto,
    status: UserStatus
  ) => void;

  onViewUser: (user: UserManagementResponseDto) => void;
}

function getFullName(user: UserManagementResponseDto) {
  return [
    user.firstName,
    user.middleName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");
}

function formatRole(role: UserRole) {
  switch (role) {
    case "superadmin":
      return "Superadmin";
    case "admin":
      return "Admin";
    default:
      return "User";
  }
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function SortIcon({
  active,
  order,
}: {
  active: boolean;
  order: SortOrder;
}) {
  if (!active) {
    return <ArrowUpDown className="h-3.5 w-3.5" />;
  }

  return order === "asc" ? (
    <ArrowUp className="h-3.5 w-3.5" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5" />
  );
}

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onSortChange,
}: {
  label: string;
  field: SortField;
  sortBy: SortField;
  sortOrder: SortOrder;
  onSortChange: (
    sortBy: SortField,
    sortOrder: SortOrder
  ) => void;
}) {
  const active = sortBy === field;

  const handleClick = () => {
    if (!active) {
      onSortChange(field, "asc");
      return;
    }

    onSortChange(
      field,
      sortOrder === "asc" ? "desc" : "asc"
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
    >
      {label}
      <SortIcon active={active} order={sortOrder} />
    </button>
  );
}

function RoleBadge({
  role,
}: {
  role: UserRole;
}) {
  const styles: Record<UserRole, string> = {
    user: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
    admin:
      "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
    superadmin:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[role]}`}
    >
      {formatRole(role)}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: UserStatus;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        status === "active"
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
          : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
      ].join(" ")}
    >
      {status === "active" ? "Active" : "Deactivated"}
    </span>
  );
}

function VerificationBadge({
  isVerified,
}: {
  isVerified: boolean;
}) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        isVerified
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400",
      ].join(" ")}
    >
      {isVerified ? "Verified" : "Unverified"}
    </span>
  );
}

function TableSkeleton() {
  return (
    <div className="divide-y divide-stone-200 dark:divide-stone-800">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-4 px-5 py-4"
        >
          <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-56 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="h-6 w-16 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-6 w-20 rounded-full bg-stone-200 dark:bg-stone-800" />
        </div>
      ))}
    </div>
  );
}

export function UserManagementTable({
  users,
  isLoading = false,
  isFetching = false,
  sortBy,
  sortOrder,
  updatingUserId,
  onSortChange,
  onStatusChange,
  onViewUser,
}: UserManagementTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
        <div>
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            Users
          </h2>

          <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
            Manage account status and view user information.
          </p>
        </div>

        {isFetching && !isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
        )}
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : users.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
              No users found
            </p>

            <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
              Try changing your search or filter criteria.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950/50">
              <tr>
                <th className="px-5 py-3 text-left">
                  <SortableHeader
                    label="User"
                    field="firstName"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                  />
                </th>

                <th className="px-5 py-3 text-left">
                  <SortableHeader
                    label="Role"
                    field="role"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                  />
                </th>

                <th className="px-5 py-3 text-left">
                  <SortableHeader
                    label="Status"
                    field="status"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                  />
                </th>

                <th className="px-5 py-3 text-left">
                  Verification
                </th>

                <th className="px-5 py-3 text-left">
                  Provider
                </th>

                <th className="px-5 py-3 text-left">
                  <SortableHeader
                    label="Last Login"
                    field="lastLogin"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortChange={onSortChange}
                  />
                </th>

                <th className="px-5 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {users.map((user) => {
                const fullName = getFullName(user);
                const isUpdating = updatingUserId === user.id;

                return (
                  <tr
                    key={user.id}
                    className="transition hover:bg-stone-50/80 dark:hover:bg-stone-800/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar?.url ? (
                          <img
                            src={user.avatar.url}
                            alt={fullName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            {user.firstName
                              .charAt(0)
                              .toUpperCase()}
                            {user.lastName
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">
                            {fullName}
                          </p>

                          <p className="truncate text-xs text-stone-500 dark:text-stone-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="px-5 py-4">
                      <VerificationBadge
                        isVerified={user.isVerified}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm capitalize text-stone-600 dark:text-stone-300">
                        {user.authProvider}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="whitespace-nowrap text-sm text-stone-600 dark:text-stone-300">
                        {formatDate(user.lastLogin)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onViewUser(user)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>

                        {user.role !== "superadmin" && (
                          <UserStatusAction
                            status={user.status}
                            isLoading={isUpdating}
                            onChange={(status) =>
                              onStatusChange(user, status)
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
