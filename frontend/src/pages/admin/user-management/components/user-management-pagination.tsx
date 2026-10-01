
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface UserManagementPaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function UserManagementPagination({
  page,
  limit,
  totalItems,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onLimitChange,
}: UserManagementPaginationProps) {
  const startItem =
    totalItems === 0 ? 0 : (page - 1) * limit + 1;

  const endItem = Math.min(page * limit, totalItems);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {totalItems === 0
            ? "No users"
            : `Showing ${startItem}-${endItem} of ${totalItems}`}
        </p>

        <select
          value={limit}
          onChange={(event) =>
            onLimitChange(Number(event.target.value))
          }
          className="h-9 rounded-lg border border-stone-200 bg-stone-50 px-2.5 text-sm text-stone-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300"
          aria-label="Users per page"
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 px-3 text-sm font-medium text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>

        <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white">
          {page}
        </div>

        <span className="text-sm text-stone-400">
          of {totalPages || 1}
        </span>

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-stone-200 px-3 text-sm font-medium text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}