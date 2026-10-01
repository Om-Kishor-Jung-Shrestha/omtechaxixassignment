
import { RotateCcw, Search } from "lucide-react";

import type {
  AuthProvider,
  UserRole,
  UserStatus,
} from "@/types/user.types";

interface UserManagementFiltersProps {
  search: string;
  role?: UserRole;
  status?: UserStatus;
  authProvider?: AuthProvider;
  isVerified?: boolean;

  onSearchChange: (value: string) => void;
  onRoleChange: (value?: UserRole) => void;
  onStatusChange: (value?: UserStatus) => void;
  onAuthProviderChange: (value?: AuthProvider) => void;
  onVerificationChange: (value?: boolean) => void;
  onReset: () => void;
}

export function UserManagementFilters({
  search,
  role,
  status,
  authProvider,
  isVerified,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onAuthProviderChange,
  onVerificationChange,
  onReset,
}: UserManagementFiltersProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <label
            htmlFor="user-search"
            className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
          >
            Search
          </label>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

            <input
              id="user-search"
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by name or email..."
              className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 pl-9 pr-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="user-role"
            className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
          >
            Role
          </label>

          <select
            id="user-role"
            value={role ?? ""}
            onChange={(event) =>
              onRoleChange(
                event.target.value
                  ? (event.target.value as UserRole)
                  : undefined
              )
            }
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="">All roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="user-status"
            className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
          >
            Status
          </label>

          <select
            id="user-status"
            value={status ?? ""}
            onChange={(event) =>
              onStatusChange(
                event.target.value
                  ? (event.target.value as UserStatus)
                  : undefined
              )
            }
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="user-provider"
            className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
          >
            Auth Provider
          </label>

          <select
            id="user-provider"
            value={authProvider ?? ""}
            onChange={(event) =>
              onAuthProviderChange(
                event.target.value
                  ? (event.target.value as AuthProvider)
                  : undefined
              )
            }
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="">All providers</option>
            <option value="local">Local</option>
            <option value="google">Google</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label
            htmlFor="user-verification"
            className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
          >
            Verification
          </label>

          <select
            id="user-verification"
            value={
              isVerified === undefined
                ? ""
                : isVerified
                  ? "true"
                  : "false"
            }
            onChange={(event) => {
              const value = event.target.value;

              onVerificationChange(
                value === ""
                  ? undefined
                  : value === "true"
              );
            }}
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="">All users</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-stone-200 px-3 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100"
        >
          <RotateCcw className="h-4 w-4" />
          Reset filters
        </button>
      </div>
    </div>
  );
}
