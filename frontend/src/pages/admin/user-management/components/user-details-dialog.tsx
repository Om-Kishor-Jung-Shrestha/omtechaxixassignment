
import { UserManagementResponseDto } from "@/features/users/types/user.types";
import {
  CheckCircle2,
  CircleUserRound,
  Clock3,
  Mail,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";

// import type { UserManagementResponseDto } from "../../types/user.types";

interface UserDetailsDialogProps {
  user: UserManagementResponseDto | null;
  open: boolean;
  onClose: () => void;
}

function getFullName(user: UserManagementResponseDto) {
  return [
    user.firstName,
    user.middleName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");
}

function formatDate(value?: string) {
  if (!value) return "Never";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-stone-400">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {label}
        </p>

        <div className="mt-0.5 break-words text-sm font-medium text-stone-800 dark:text-stone-200">
          {value}
        </div>
      </div>
    </div>
  );
}

export function UserDetailsDialog({
  user,
  open,
  onClose,
}: UserDetailsDialogProps) {
  if (!open || !user) {
    return null;
  }

  const fullName = getFullName(user);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-details-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-start justify-between border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <div className="flex items-center gap-4">
            {user.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt={fullName}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h2
                id="user-details-title"
                className="text-lg font-semibold text-stone-900 dark:text-stone-100"
              >
                {fullName}
              </h2>

              <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            aria-label="Close user details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <DetailRow
              icon={CircleUserRound}
              label="Role"
              value={
                <span className="capitalize">
                  {user.role}
                </span>
              }
            />

            <DetailRow
              icon={
                user.status === "active"
                  ? CheckCircle2
                  : XCircle
              }
              label="Status"
              value={
                <span
                  className={
                    user.status === "active"
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }
                >
                  {user.status === "active"
                    ? "Active"
                    : "Deactivated"}
                </span>
              }
            />

            <DetailRow
              icon={Mail}
              label="Email"
              value={user.email}
            />

            <DetailRow
              icon={ShieldCheck}
              label="Verification"
              value={
                user.isVerified
                  ? "Verified"
                  : "Unverified"
              }
            />

            <DetailRow
              icon={ShieldCheck}
              label="Authentication Provider"
              value={
                <span className="capitalize">
                  {user.authProvider}
                </span>
              }
            />

            <DetailRow
              icon={ShieldCheck}
              label="Provider Linked"
              value={
                user.providerLinked ? "Yes" : "No"
              }
            />

            <DetailRow
              icon={Clock3}
              label="Last Login"
              value={formatDate(user.lastLogin)}
            />

            <DetailRow
              icon={Clock3}
              label="Created At"
              value={formatDate(user.createdAt)}
            />

            <DetailRow
              icon={Clock3}
              label="Updated At"
              value={formatDate(user.updatedAt)}
            />

            <DetailRow
              icon={CircleUserRound}
              label="Enrolled Courses"
              value={user.courses.length}
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-stone-200 px-6 py-4 dark:border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}