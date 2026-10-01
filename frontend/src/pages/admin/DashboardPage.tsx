import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Users,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useAppSelector } from "@/app/store/hooks";
import { useGetDashboardQuery } from "@/features/dashboard/api/dashboard.api";

type DashboardTab =
  | "overview"
  | "applications"
  | "programs"
  | "users";

const statusConfig = [
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    color: "#d97706",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
  },
  {
    key: "underReview",
    label: "Under Review",
    icon: BarChart3,
    color: "#2563eb",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
  },
  {
    key: "approved",
    label: "Approved",
    icon: CheckCircle2,
    color: "#059669",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: AlertCircle,
    color: "#dc2626",
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
            {formatNumber(value)}
          </p>

          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}
        >
          <Icon size={21} />
        </div>
      </div>

      {children}
    </div>
  );
}

/* =========================================================
   STATUS PILL
========================================================= */

function StatusPill({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div className={`rounded-lg px-2.5 py-2 ${className}`}>
      <p className="text-[11px] font-medium opacity-80">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-bold">
        {formatNumber(value)}
      </p>
    </div>
  );
}

/* =========================================================
   APPLICATION STATUS OVERVIEW
========================================================= */

function ApplicationStatusOverview({
  total,
  pending,
  underReview,
  approved,
  rejected,
}: {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}) {
  const values = {
    pending,
    underReview,
    approved,
    rejected,
  };

  const gradient = useMemo(() => {
    if (total <= 0) {
      return "#e7e5e4 0deg 360deg";
    }

    let current = 0;

    const segments = statusConfig.map((status) => {
      const value = values[status.key];

      const degrees = (value / total) * 360;

      const start = current;
      const end = current + degrees;

      current = end;

      return `${status.color} ${start}deg ${end}deg`;
    });

    return segments.join(", ");
  }, [
    total,
    pending,
    underReview,
    approved,
    rejected,
  ]);

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-900 dark:text-white">
            Application Status Overview
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Current application pipeline.
          </p>
        </div>

        <div className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          Live statistics
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">
        {/* Donut */}

        <div className="flex justify-center">
          <div
            className="relative flex h-48 w-48 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${gradient})`,
            }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner dark:bg-stone-900">
              <span className="text-3xl font-bold text-stone-900 dark:text-white">
                {formatNumber(total)}
              </span>

              <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                Total Applications
              </span>
            </div>
          </div>
        </div>

        {/* Status breakdown */}

        <div className="space-y-4">
          {statusConfig.map((status) => {
            const value = values[status.key];

            const percentage =
              total > 0
                ? Math.round((value / total) * 100)
                : 0;

            const Icon = status.icon;

            return (
              <div key={status.key}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${status.bg} ${status.text}`}
                    >
                      <Icon size={16} />
                    </div>

                    <span className="text-sm font-medium text-stone-700 dark:text-stone-200">
                      {status.label}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">
                      {formatNumber(value)}
                    </span>

                    <span className="ml-2 text-xs text-stone-500 dark:text-stone-400">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: status.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DASHBOARD TABS
========================================================= */

function DashboardTabs({
  activeTab,
  onChange,
  isAdmin,
}: {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
  isAdmin: boolean;
}) {
  const tabs: {
    key: DashboardTab;
    label: string;
  }[] = [
    {
      key: "overview",
      label: "Overview",
    },
    {
      key: "applications",
      label: "Applications",
    },
    ...(isAdmin
      ? [
          {
            key: "programs" as const,
            label: "Programs",
          },
          {
            key: "users" as const,
            label: "Users",
          },
        ]
      : []),
  ];

  return (
    <div className="overflow-x-auto border-b border-stone-200 dark:border-stone-800">
      <div className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`
                relative px-4 py-3 text-sm font-semibold transition
                ${
                  active
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
                }
              `}
            >
              {tab.label}

              {active && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   APPLICATIONS TAB
========================================================= */

function ApplicationsTab({
  total,
  pending,
  underReview,
  approved,
  rejected,
}: {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}) {
  const values = {
    pending,
    underReview,
    approved,
    rejected,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statusConfig.map((status) => {
          const value = values[status.key];

          const percentage =
            total > 0
              ? Math.round((value / total) * 100)
              : 0;

          const Icon = status.icon;

          return (
            <div
              key={status.key}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${status.bg} ${status.text}`}
                >
                  <Icon size={19} />
                </div>

                <span className="text-xs font-medium text-stone-400">
                  {percentage}%
                </span>
              </div>

              <p className="mt-5 text-sm text-stone-500 dark:text-stone-400">
                {status.label}
              </p>

              <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-white">
                {formatNumber(value)}
              </p>
            </div>
          );
        })}
      </div>

      <ApplicationStatusOverview
        total={total}
        pending={pending}
        underReview={underReview}
        approved={approved}
        rejected={rejected}
      />
    </div>
  );
}

/* =========================================================
   PROGRAMS TAB
========================================================= */

function ProgramsTab({
  total,
}: {
  total: number;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          <BookOpen size={22} />
        </div>

        <p className="mt-6 text-sm font-medium text-stone-500 dark:text-stone-400">
          Total Programs
        </p>

        <p className="mt-1 text-4xl font-bold text-stone-900 dark:text-white">
          {formatNumber(total)}
        </p>

        <p className="mt-3 max-w-lg text-sm leading-6 text-stone-500 dark:text-stone-400">
          Programs currently configured in the admission
          management system.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              Program Management
            </h3>

            <p className="mt-1 text-sm leading-6 text-stone-500 dark:text-stone-400">
              Manage academic programs from the
              administration area.
            </p>
          </div>

          <ArrowUpRight
            size={20}
            className="shrink-0 text-stone-400"
          />
        </div>

        <div className="mt-6 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
            Catalog status
          </p>

          <p className="mt-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
            {total > 0
              ? "Program catalog is configured."
              : "No programs have been configured yet."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   USERS TAB
========================================================= */

function UsersTab({
  total,
}: {
  total: number;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
          <Users size={22} />
        </div>

        <p className="mt-6 text-sm font-medium text-stone-500 dark:text-stone-400">
          Total System Users
        </p>

        <p className="mt-1 text-4xl font-bold text-stone-900 dark:text-white">
          {formatNumber(total)}
        </p>

        <p className="mt-3 max-w-lg text-sm leading-6 text-stone-500 dark:text-stone-400">
          Total registered accounts currently known by
          the system.
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <h3 className="text-base font-bold text-stone-900 dark:text-white">
          Account Management
        </h3>

        <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
          User management, account status and administrative
          permissions are available to authorized
          administrators.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <Users
            size={19}
            className="text-emerald-700 dark:text-emerald-400"
          />

          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
            {formatNumber(total)} registered accounts
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export function DashboardPage() {
  const user = useAppSelector(
    (state) => state.auth.user,
  );

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "superadmin";

  const [activeTab, setActiveTab] =
    useState<DashboardTab>("overview");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetDashboardQuery();

  const displayName =
    [user?.firstName, user?.lastName]
      .filter(Boolean)
      .join(" ") || "there";

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  /* =======================================================
     LOADING
  ======================================================= */

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />

          <div className="h-5 w-80 animate-pulse rounded-lg bg-stone-200 dark:bg-stone-800" />

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800"
              />
            ))}
          </div>

          <div className="h-96 animate-pulse rounded-2xl bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (isError || !data) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-stone-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle size={22} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-stone-900 dark:text-white">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm leading-6 text-stone-500 dark:text-stone-400">
            We couldn't retrieve the latest dashboard
            statistics.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     DATA
  ======================================================= */

  const {
    applications,
    programs,
    users,
  } = data;

  /*
   * Application statistics are available to:
   * - user/counselor
   * - admin
   * - superadmin
   *
   * Program and user statistics are admin-only.
   */
  const applicationData = applications;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {isAdmin
                ? "Administration"
                : "Admission Management"}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500 dark:text-stone-400 sm:text-base">
              {isAdmin
                ? `Welcome back, ${displayName}. Here's what's happening with your system today.`
                : `Welcome back, ${displayName}. Here's the current admission application overview.`}
            </p>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <p className="text-xs font-medium text-stone-400">
              Today
            </p>

            <p className="mt-1 font-semibold text-stone-800 dark:text-stone-200">
              {today}
            </p>
          </div>
        </section>

        {/* =================================================
            TABS
        ================================================= */}

        <section className="rounded-2xl border border-stone-200 bg-white px-2 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <DashboardTabs
            activeTab={activeTab}
            onChange={setActiveTab}
            isAdmin={isAdmin}
          />
        </section>

        {/* =================================================
            OVERVIEW
        ================================================= */}

        {activeTab === "overview" && (
          <>
            {isAdmin ? (
              <>
                {/* ADMIN OVERVIEW */}

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <MetricCard
                    title="Total Applications"
                    value={applicationData.total}
                    description="All submitted admission applications"
                    icon={ClipboardList}
                    accent="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  >
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <StatusPill
                        label="Pending"
                        value={applicationData.pending}
                        className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                      />

                      <StatusPill
                        label="Under Review"
                        value={applicationData.underReview}
                        className="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                      />

                      <StatusPill
                        label="Approved"
                        value={applicationData.approved}
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                      />

                      <StatusPill
                        label="Rejected"
                        value={applicationData.rejected}
                        className="bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      />
                    </div>
                  </MetricCard>

                  <MetricCard
                    title="Total Programs"
                    value={programs?.total ?? 0}
                    description="Programs available in the system"
                    icon={BookOpen}
                    accent="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                  >
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3 dark:bg-stone-800/60">
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Academic catalog
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-stone-400"
                      />
                    </div>
                  </MetricCard>

                  <MetricCard
                    title="Total Users"
                    value={users?.total ?? 0}
                    description="Registered system accounts"
                    icon={Users}
                    accent="bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400"
                  >
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-stone-50 px-4 py-3 dark:bg-stone-800/60">
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Registered accounts
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-stone-400"
                      />
                    </div>
                  </MetricCard>
                </section>

                <ApplicationStatusOverview
                  total={applicationData.total}
                  pending={applicationData.pending}
                  underReview={applicationData.underReview}
                  approved={applicationData.approved}
                  rejected={applicationData.rejected}
                />
              </>
            ) : (
              <>
                {/* COUNSELOR OVERVIEW */}

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <MetricCard
                    title="Total Applications"
                    value={applicationData.total}
                    description="Applications submitted by applicants"
                    icon={ClipboardList}
                    accent="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                  >
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <StatusPill
                        label="Pending"
                        value={applicationData.pending}
                        className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                      />

                      <StatusPill
                        label="Under Review"
                        value={applicationData.underReview}
                        className="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                      />

                      <StatusPill
                        label="Approved"
                        value={applicationData.approved}
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                      />

                      <StatusPill
                        label="Rejected"
                        value={applicationData.rejected}
                        className="bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
                      />
                    </div>
                  </MetricCard>

                  <MetricCard
                    title="Pending Review"
                    value={applicationData.pending}
                    description="Applications waiting for review"
                    icon={Clock3}
                    accent="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                  />

                  <MetricCard
                    title="Under Review"
                    value={applicationData.underReview}
                    description="Applications currently being processed"
                    icon={BarChart3}
                    accent="bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
                  />
                </section>

                <ApplicationStatusOverview
                  total={applicationData.total}
                  pending={applicationData.pending}
                  underReview={applicationData.underReview}
                  approved={applicationData.approved}
                  rejected={applicationData.rejected}
                />
              </>
            )}
          </>
        )}

        {/* =================================================
            APPLICATIONS
        ================================================= */}

        {activeTab === "applications" && (
          <ApplicationsTab
            total={applicationData.total}
            pending={applicationData.pending}
            underReview={applicationData.underReview}
            approved={applicationData.approved}
            rejected={applicationData.rejected}
          />
        )}

        {/* =================================================
            PROGRAMS - ADMIN ONLY
        ================================================= */}

        {activeTab === "programs" &&
          isAdmin &&
          programs && (
            <ProgramsTab
              total={programs.total}
            />
          )}

        {/* =================================================
            USERS - ADMIN ONLY
        ================================================= */}

        {activeTab === "users" &&
          isAdmin &&
          users && (
            <UsersTab
              total={users.total}
            />
          )}
      </div>
    </div>
  );
}

export default DashboardPage;