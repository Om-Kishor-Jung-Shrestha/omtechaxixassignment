
import { Link, useLocation } from "react-router-dom";

import type { ApplicationResponseDto } from "@/features/application/types/application.types";

import { ApplicationStatusBadge } from "./application-status-badge";

interface ApplicationsTableProps {
  applications: ApplicationResponseDto[];
  isLoading?: boolean;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

function getApplicantName(application: ApplicationResponseDto) {
  return [
    application.firstName,
    application.middleName,
    application.lastName,
  ]
    .filter(Boolean)
    .join(" ");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function getApplicantInitial(application: ApplicationResponseDto) {
  return application.firstName?.charAt(0).toUpperCase() || "?";
}

export function ApplicationsTable({
  applications,
  isLoading = false,
  page = 1,
  totalPages = 1,
  totalItems,
  limit = 10,
  onPageChange,
}: ApplicationsTableProps) {
  const location = useLocation();

  const isAdminApplicationPage =
    location.pathname.startsWith("/admin/applications");

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="space-y-3 p-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-16 animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center dark:border-stone-800 dark:bg-stone-900">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          No applications found
        </h3>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  const effectiveTotalItems = totalItems ?? applications.length;

  const firstItem =
    effectiveTotalItems === 0 ? 0 : (page - 1) * limit + 1;

  const lastItem = Math.min(
    page * limit,
    effectiveTotalItems
  );

  const visiblePageNumbers = Array.from(
    { length: Math.max(totalPages, 1) },
    (_, index) => index + 1
  );

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full divide-y divide-stone-200 dark:divide-stone-800">
          <thead className="bg-stone-50 dark:bg-stone-950">
            <tr>
              <th className="w-16 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                No.
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Applicant
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Program
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Session
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Intake
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Status
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            {applications.map((application, index) => {
              const rowNumber =
                (page - 1) * limit + index + 1;

              const applicantName =
                getApplicantName(application);

              const applicantImageUrl =
                application.applicantImage?.url;

              const detailsPath = isAdminApplicationPage
                ? `/admin/applications/${application.id}`
                : `/applications/${application.id}`;

              return (
                <tr
                  key={application.id}
                  className="transition hover:bg-stone-50 dark:hover:bg-stone-800/50"
                >
                  <td className="px-5 py-4 text-center">
                    <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
                      {rowNumber}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        {applicantImageUrl ? (
                          <img
                            src={applicantImageUrl}
                            alt={applicantName}
                            className="h-12 w-12 rounded-xl border border-stone-200 object-cover dark:border-stone-700"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-stone-100 text-sm font-semibold text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
                            {getApplicantInitial(application)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-stone-900 dark:text-stone-100">
                          {applicantName}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-stone-500 dark:text-stone-400">
                          {application.email}
                        </p>

                        <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
                          {application.phone}
                        </p>

                        <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
                          {formatDate(application.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-72 truncate text-sm font-medium text-stone-800 dark:text-stone-200">
                      {application.program.mnemonic} —{" "}
                      {application.program.name}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                    {application.admissionSession}
                  </td>

                  <td className="px-5 py-4 text-sm text-stone-700 dark:text-stone-300">
                    {application.admissionIntake}
                  </td>

                  <td className="px-5 py-4">
                    <ApplicationStatusBadge
                      status={application.status}
                    />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Link
                      to={detailsPath}
                      className="inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {onPageChange && (
        <div className="flex flex-col gap-4 border-t border-stone-200 px-5 py-4 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Showing{" "}
            <span className="font-medium text-stone-700 dark:text-stone-200">
              {firstItem}
            </span>{" "}
            to{" "}
            <span className="font-medium text-stone-700 dark:text-stone-200">
              {lastItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-stone-700 dark:text-stone-200">
              {effectiveTotalItems}
            </span>{" "}
            applications
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() =>
                onPageChange(Math.max(1, page - 1))
              }
              className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-stone-200 px-2 text-sm text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              aria-label="Previous page"
            >
              ‹
            </button>

            {visiblePageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-current={
                  pageNumber === page ? "page" : undefined
                }
                className={
                  pageNumber === page
                    ? "flex h-9 min-w-9 items-center justify-center rounded-lg bg-stone-900 px-2 text-sm font-medium text-white dark:bg-stone-100 dark:text-stone-900"
                    : "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm text-stone-600 transition hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                }
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() =>
                onPageChange(
                  Math.min(totalPages, page + 1)
                )
              }
              className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-stone-200 px-2 text-sm text-stone-600 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
