
import React from "react";

import type {
  CoursesPaginationProps,
} from "../types/course-management.types";

const CoursesPagination: React.FC<CoursesPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}) => {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center border-t border-stone-200 bg-white px-4 py-4 dark:border-stone-800 dark:bg-stone-950 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-300 dark:hover:bg-stone-800"
        >
          Previous
        </button>

        <span className="min-w-[90px] px-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-300 dark:hover:bg-stone-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoursesPagination;
