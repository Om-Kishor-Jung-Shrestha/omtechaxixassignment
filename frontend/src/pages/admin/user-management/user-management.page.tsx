
import { UserManagementFilters } from "./components/user-management-filters";
import { UserManagementHeader } from "./components/user-management-header";
import { UserManagementPagination } from "./components/user-management-pagination";
import { UserManagementTable } from "./components/user-management-table";
import { UserDetailsDialog } from "./components/user-details-dialog";

import { useUserManagement } from "./hooks/use-user-management";

export default function UserManagementPage() {
  const management = useUserManagement();

  return (
    <div className="space-y-6">
      <UserManagementHeader />

      <UserManagementFilters
        search={management.search}
        role={management.role}
        status={management.status}
        authProvider={management.authProvider}
        isVerified={management.isVerified}
        onSearchChange={management.handleSearchChange}
        onRoleChange={management.handleRoleChange}
        onStatusChange={management.handleStatusChange}
        onAuthProviderChange={
          management.handleAuthProviderChange
        }
        onVerificationChange={
          management.handleVerificationChange
        }
        onReset={management.resetFilters}
      />

      {management.isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 dark:border-rose-900/50 dark:bg-rose-950/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-800 dark:text-rose-300">
                Unable to load users
              </p>

              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                Something went wrong while retrieving the
                user list.
              </p>
            </div>

            <button
              type="button"
              onClick={() => management.refetch()}
              className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-200 bg-white px-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-950/50"
            >
              Try again
            </button>
          </div>
        </div>
      ) : null}

      <UserManagementTable
        users={management.users}
        isLoading={management.isLoading}
        isFetching={management.isFetching}
        sortBy={management.sortBy}
        sortOrder={management.sortOrder}
        updatingUserId={management.updatingUserId}
        onSortChange={management.handleSortChange}
        onStatusChange={
          management.handleUserStatusChange
        }
        onViewUser={management.handleViewUser}
      />

      <UserManagementPagination
        page={management.page}
        limit={management.limit}
        totalItems={management.totalItems}
        totalPages={management.totalPages}
        hasNextPage={management.hasNextPage}
        hasPreviousPage={management.hasPreviousPage}
        onPageChange={management.handlePageChange}
        onLimitChange={management.handleLimitChange}
      />

      <UserDetailsDialog
        user={management.selectedUser}
        open={management.isDetailsOpen}
        onClose={management.handleCloseDetails}
      />
    </div>
  );
}