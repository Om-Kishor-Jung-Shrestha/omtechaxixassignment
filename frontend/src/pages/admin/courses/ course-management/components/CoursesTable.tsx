
import React, { useMemo } from "react";

import type {
  CoursesTableProps,
} from "../types/course-management.types";

const CoursesTable: React.FC<CoursesTableProps> = ({
  courses,
  programs,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
  deletingCourseId = null,
}) => {
  const programMap = useMemo(() => {
    return new Map(
      programs.map((program) => [
        program.id,
        program,
      ]),
    );
  }, [programs]);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString();
  };

  const formatFee = (fee: number) => {
    return new Intl.NumberFormat().format(fee);
  };

  const getProgramLabel = (programId: string) => {
    const program = programMap.get(programId);

    if (!program) {
      return programId;
    }

    return `${program.name} (${program.mnemonic})`;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800">
          <thead className="bg-stone-50 dark:bg-stone-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Program
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Duration
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Semesters
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total Fee
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Created
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200 bg-white dark:divide-stone-800 dark:bg-stone-950">
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center"
                >
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    No courses found
                  </div>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try changing your search or filter
                    criteria.
                  </p>
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr
                  key={course.id}
                  className="transition hover:bg-stone-50 dark:hover:bg-stone-900"
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {getProgramLabel(course.program)}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {course.duration}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {course.totalSemesters}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatFee(course.totalFee)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(course.createdAt)}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => onView(course)}
                        className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(course)}
                        className="text-sm font-medium text-primary transition hover:text-primary/80"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={
                          isDeleting &&
                          deletingCourseId === course.id
                        }
                        onClick={() => onDelete(course)}
                        className="text-sm font-medium text-red-600 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
                      >
                        {isDeleting &&
                        deletingCourseId === course.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
