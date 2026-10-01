
import React from "react";

import type {
  CourseManagementFilters,
  CoursesSearchProps,
} from "../types/course-management.types";

const CoursesSearch: React.FC<CoursesSearchProps> = ({
  filters,
  programs,
  onFiltersChange,
  onReset,
}) => {
  const updateFilter = (
    key: keyof CourseManagementFilters,
    value: string,
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div>
          <label
            htmlFor="course-search"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Search
          </label>

          <input
            id="course-search"
            type="text"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            placeholder="Search courses"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="course-program"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Program
          </label>

          <select
            id="course-program"
            value={filters.program}
            onChange={(event) =>
              updateFilter("program", event.target.value)
            }
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100"
          >
            <option value="">All programs</option>

            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.mnemonic})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="course-duration"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Duration
          </label>

          <input
            id="course-duration"
            type="text"
            value={filters.duration}
            onChange={(event) =>
              updateFilter(
                "duration",
                event.target.value,
              )
            }
            placeholder="e.g. 4 years"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="course-min-fee"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Minimum Fee
          </label>

          <input
            id="course-min-fee"
            type="number"
            min="0"
            value={filters.minFee}
            onChange={(event) =>
              updateFilter(
                "minFee",
                event.target.value,
              )
            }
            placeholder="Minimum fee"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="course-max-fee"
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Maximum Fee
          </label>

          <input
            id="course-max-fee"
            type="number"
            min="0"
            value={filters.maxFee}
            onChange={(event) =>
              updateFilter(
                "maxFee",
                event.target.value,
              )
            }
            placeholder="Maximum fee"
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-gray-300 dark:hover:bg-stone-800"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default CoursesSearch;
