
import { Users } from "lucide-react";

export function UserManagementHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              User Management
            </h1>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Manage users, administrators, account status, and access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
