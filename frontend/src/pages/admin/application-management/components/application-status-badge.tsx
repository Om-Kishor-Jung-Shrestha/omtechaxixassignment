import type { ApplicationStatus } from "@/types/application.types";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const STATUS_CONFIG: Record<
  ApplicationStatus,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-900",
  },
  under_review: {
    label: "Under Review",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:ring-blue-900",
  },
  approved: {
    label: "Approved",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-900",
  },
  rejected: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-900",
  },
};

export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}