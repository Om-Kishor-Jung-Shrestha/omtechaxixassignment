import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProgramsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function ProgramsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ProgramsPaginationProps) {
  const start =
    (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="flex flex-col gap-4 border-t border-stone-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
      <p className="text-sm text-stone-500">
        Showing{" "}
        <span className="font-medium text-stone-700 dark:text-stone-200">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-medium text-stone-700 dark:text-stone-200">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-stone-700 dark:text-stone-200">
          {totalItems}
        </span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 disabled:opacity-40 dark:border-stone-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm ${
              currentPage === page
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "hover:bg-stone-100 dark:hover:bg-stone-900"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 disabled:opacity-40 dark:border-stone-700"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}