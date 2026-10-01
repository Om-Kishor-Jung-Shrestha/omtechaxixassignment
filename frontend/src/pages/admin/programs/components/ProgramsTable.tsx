import {
  Eye,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import type { ProgramResponseDto } from "@/features/programs/types/program.types";

interface ProgramsTableProps {
  programs: ProgramResponseDto[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isDeleting: boolean;
  hasSearch: boolean;

  onView: (program: ProgramResponseDto) => void;
  onEdit: (program: ProgramResponseDto) => void;
  onDelete: (program: ProgramResponseDto) => void;
  onAddProgram: () => void;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function ProgramsTable({
  programs,
  isLoading,
  isFetching,
  isError,
  isDeleting,
  hasSearch,
  onView,
  onEdit,
  onDelete,
  onAddProgram,
}: ProgramsTableProps) {
  if (isLoading) {
    return (
      <TableContainer>
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-sm text-stone-500">
            Loading programs...
          </p>
        </div>
      </TableContainer>
    );
  }

  if (isError) {
    return (
      <TableContainer>
        <div className="flex min-h-64 items-center justify-center">
          <p className="text-sm text-red-600">
            Unable to load programs.
          </p>
        </div>
      </TableContainer>
    );
  }

  if (programs.length === 0) {
    return (
      <TableContainer>
        <div className="flex min-h-64 items-center justify-center px-6 text-center">
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
              No programs found.
            </p>

            <p className="mt-1 text-sm text-stone-500">
              {hasSearch
                ? "Try a different search term."
                : "Create your first program to get started."}
            </p>

            {!hasSearch && (
              <button
                type="button"
                onClick={onAddProgram}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white"
              >
                <Plus className="h-4 w-4" />
                Add Program
              </button>
            )}
          </div>
        </div>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900/60">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Mnemonic
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Program Name
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Year & Semester
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Created
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {programs.map((program) => (
              <tr
                key={program.id}
                className="hover:bg-stone-50 dark:hover:bg-stone-900/50"
              >
                <td className="px-6 py-4">
                  <span className="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                    {program.mnemonic}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-stone-900 dark:text-stone-100">
                    {program.name}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {program.course ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {program.course.duration} ·{" "}
                      {program.course.totalSemesters} semesters
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      Not Added
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm text-stone-500">
                  {formatDate(program.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView(program)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-stone-100"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(program)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-stone-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => onDelete(program)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFetching && (
        <div className="border-t border-stone-100 px-6 py-2 text-right text-xs text-stone-400">
          Updating...
        </div>
      )}
    </TableContainer>
  );
}

function TableContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      {children}
    </section>
  );
}