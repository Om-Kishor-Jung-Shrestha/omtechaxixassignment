import {
  Filter,
  RotateCcw,
  Search,
  X,
} from "lucide-react";

import type {
  ApplicationIntake,
  ApplicationStatus,
} from "@/types/application.types";

interface ApplicationProgramOption {
  id: string;
  mnemonic: string;
  name: string;
}

interface ApplicationFiltersProps {
  name: string;
  email: string;
  phone: string;

  program: string;
  status: string;
  admissionSession: string;
  admissionIntake: string;

  programs: ApplicationProgramOption[];
  sessions: string[];

  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;

  onProgramChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSessionChange: (value: string) => void;
  onIntakeChange: (value: string) => void;

  onReset: () => void;
}

const statuses: {
  value: ApplicationStatus;
  label: string;
}[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "under_review",
    label: "Under Review",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

const intakes: {
  value: ApplicationIntake;
  label: string;
}[] = [
  {
    value: "Spring",
    label: "Spring",
  },
  {
    value: "Fall",
    label: "Fall",
  },
];

export function ApplicationFilters({
  name,
  email,
  phone,
  program,
  status,
  admissionSession,
  admissionIntake,
  programs,
  sessions,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onProgramChange,
  onStatusChange,
  onSessionChange,
  onIntakeChange,
  onReset,
}: ApplicationFiltersProps) {
  const hasActiveFilters =
    name.trim() !== "" ||
    email.trim() !== "" ||
    phone.trim() !== "" ||
    program !== "" ||
    status !== "" ||
    admissionSession !== "" ||
    admissionIntake !== "";

  return (
    <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-stone-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-300">
            <Filter className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Search & Filters
            </h2>

            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Search applicants and filter applications by admission details.
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-xs font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-300 dark:hover:bg-stone-900"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset filters
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Applicant Search */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200">
              Applicant search
            </h3>

            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Search using applicant name, email address, or phone number.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Name */}
            <div>
              <label
                htmlFor="application-name"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Applicant name
              </label>

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                <input
                  id="application-name"
                  type="search"
                  value={name}
                  onChange={(event) =>
                    onNameChange(event.target.value)
                  }
                  placeholder="Search by name..."
                  className="h-10 w-full rounded-lg border border-stone-300 bg-stone-50 pl-10 pr-9 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:bg-stone-900 dark:focus:ring-stone-800"
                />

                {name && (
                  <button
                    type="button"
                    onClick={() => onNameChange("")}
                    aria-label="Clear applicant name"
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-stone-400 transition hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="application-email"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Email
              </label>

              <div className="relative">
                <input
                  id="application-email"
                  type="search"
                  value={email}
                  onChange={(event) =>
                    onEmailChange(event.target.value)
                  }
                  placeholder="Search by email..."
                  className="h-10 w-full rounded-lg border border-stone-300 bg-stone-50 px-3 pr-9 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:bg-stone-900 dark:focus:ring-stone-800"
                />

                {email && (
                  <button
                    type="button"
                    onClick={() => onEmailChange("")}
                    aria-label="Clear email"
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-stone-400 transition hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="application-phone"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Phone
              </label>

              <div className="relative">
                <input
                  id="application-phone"
                  type="search"
                  value={phone}
                  onChange={(event) =>
                    onPhoneChange(event.target.value)
                  }
                  placeholder="Search by phone..."
                  className="h-10 w-full rounded-lg border border-stone-300 bg-stone-50 px-3 pr-9 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:bg-stone-900 dark:focus:ring-stone-800"
                />

                {phone && (
                  <button
                    type="button"
                    onClick={() => onPhoneChange("")}
                    aria-label="Clear phone"
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-stone-400 transition hover:bg-stone-200 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Admission Filters */}
        <div className="mt-6 border-t border-stone-200 pt-5 dark:border-stone-800">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-stone-800 dark:text-stone-200">
              Admission filters
            </h3>

            <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
              Narrow applications by program, status, intake, or session.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Program */}
            <div>
              <label
                htmlFor="application-program"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Program
              </label>

              <select
                id="application-program"
                value={program}
                onChange={(event) =>
                  onProgramChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-500 dark:focus:ring-stone-800"
              >
                <option value="">All programs</option>

                {programs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.mnemonic} — {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="application-status"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Status
              </label>

              <select
                id="application-status"
                value={status}
                onChange={(event) =>
                  onStatusChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-500 dark:focus:ring-stone-800"
              >
                <option value="">All statuses</option>

                {statuses.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Intake */}
            <div>
              <label
                htmlFor="application-intake"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Intake
              </label>

              <select
                id="application-intake"
                value={admissionIntake}
                onChange={(event) =>
                  onIntakeChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-500 dark:focus:ring-2 dark:focus:ring-stone-800"
              >
                <option value="">All intakes</option>

                {intakes.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Session */}
            <div>
              <label
                htmlFor="application-session"
                className="mb-1.5 block text-xs font-medium text-stone-600 dark:text-stone-400"
              >
                Admission session
              </label>

              <select
                id="application-session"
                value={admissionSession}
                onChange={(event) =>
                  onSessionChange(event.target.value)
                }
                className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-500 dark:focus:ring-stone-800"
              >
                <option value="">All sessions</option>

                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}