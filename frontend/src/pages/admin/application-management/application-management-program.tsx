import { useMemo, useState } from "react";

import { useGetProgramsQuery } from "@/features/programs/api/program.api";

import { useGetApplicationsQuery } from "@/features/application/api/application.api";

import { ApplicationFilters } from "./components/application-filters";

import { ApplicationStats } from "./components/application-stats";
import { ApplicationsTable } from "./components/applications-table";

// import { ApplicationsTable } from "./components/applications-table";

export default function ApplicationManagementProgram() {
  /*
  |--------------------------------------------------------------------------
  | Applicant Filters
  |--------------------------------------------------------------------------
  */

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Application Filters
  |--------------------------------------------------------------------------
  */

  const [program, setProgram] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [
    admissionSession,
    setAdmissionSession,
  ] = useState("");

  const [
    admissionIntake,
    setAdmissionIntake,
  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const [page, setPage] = useState(1);

  const limit = 10;

  /*
  |--------------------------------------------------------------------------
  | Programs
  |--------------------------------------------------------------------------
  */

  const {
    data: programsData,
  } = useGetProgramsQuery();

  const programs =
    programsData?.items ?? [];

  /*
  |--------------------------------------------------------------------------
  | Applications Query
  |--------------------------------------------------------------------------
  |
  | Name, email and phone are now sent as
  | independent query parameters.
  |
  |--------------------------------------------------------------------------
  */

  const query = {
    page,

    limit,

    name:
      name.trim() || undefined,

    email:
      email.trim() || undefined,

    phone:
      phone.trim() || undefined,

    program:
      program || undefined,

    status: status
      ? (status as
          | "pending"
          | "under_review"
          | "approved"
          | "rejected")
      : undefined,

    admissionSession:
      admissionSession || undefined,

    admissionIntake:
      admissionIntake
        ? (admissionIntake as
            | "Spring"
            | "Fall")
        : undefined,

    sortBy: "createdAt",

    sortOrder:
      "desc" as const,
  };

  /*
  |--------------------------------------------------------------------------
  | Applications
  |--------------------------------------------------------------------------
  */

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetApplicationsQuery(
    query
  );

  /*
  |--------------------------------------------------------------------------
  | Application Statistics
  |--------------------------------------------------------------------------
  */

  const {
    data: totalData,
    isLoading: totalLoading,
  } = useGetApplicationsQuery({
    page: 1,
    limit: 1,
  });

  const {
    data: pendingData,
    isLoading: pendingLoading,
  } = useGetApplicationsQuery({
    page: 1,
    limit: 1,
    status: "pending",
  });

  const {
    data: reviewData,
    isLoading: reviewLoading,
  } = useGetApplicationsQuery({
    page: 1,
    limit: 1,
    status: "under_review",
  });

  const {
    data: approvedData,
    isLoading: approvedLoading,
  } = useGetApplicationsQuery({
    page: 1,
    limit: 1,
    status: "approved",
  });

  /*
  |--------------------------------------------------------------------------
  | Admission Sessions
  |--------------------------------------------------------------------------
  */

  const sessions = useMemo(() => {
    const values =
      data?.data.map(
        (application) =>
          application.admissionSession
      ) ?? [];

    return Array.from(
      new Set(values)
    )
      .filter(Boolean)
      .sort();
  }, [data?.data]);

  /*
  |--------------------------------------------------------------------------
  | Applicant Filter Handlers
  |--------------------------------------------------------------------------
  */

  const handleNameChange = (
    value: string
  ) => {
    setName(value);
    setPage(1);
  };

  const handleEmailChange = (
    value: string
  ) => {
    setEmail(value);
    setPage(1);
  };

  const handlePhoneChange = (
    value: string
  ) => {
    setPhone(value);
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Application Filter Handlers
  |--------------------------------------------------------------------------
  */

  const handleProgramChange = (
    value: string
  ) => {
    setProgram(value);
    setPage(1);
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handleSessionChange = (
    value: string
  ) => {
    setAdmissionSession(value);
    setPage(1);
  };

  const handleIntakeChange = (
    value: string
  ) => {
    setAdmissionIntake(value);
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Reset Filters
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setName("");

    setEmail("");

    setPhone("");

    setProgram("");

    setStatus("");

    setAdmissionSession("");

    setAdmissionIntake("");

    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const totalPages =
    data?.meta.totalPages ?? 1;

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        {/* Page Header */}

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Applications
          </h1>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Manage student admission
            applications.
          </p>
        </div>

        {/* Statistics */}

        <ApplicationStats
          total={
            totalData?.meta.total ?? 0
          }
          pending={
            pendingData?.meta.total ?? 0
          }
          underReview={
            reviewData?.meta.total ?? 0
          }
          approved={
            approvedData?.meta.total ?? 0
          }
          isLoading={
            totalLoading ||
            pendingLoading ||
            reviewLoading ||
            approvedLoading
          }
        />

        {/* Search & Filters */}

        <ApplicationFilters
          name={name}
          email={email}
          phone={phone}
          program={program}
          status={status}
          admissionSession={
            admissionSession
          }
          admissionIntake={
            admissionIntake
          }
          programs={programs}
          sessions={sessions}
          onNameChange={
            handleNameChange
          }
          onEmailChange={
            handleEmailChange
          }
          onPhoneChange={
            handlePhoneChange
          }
          onProgramChange={
            handleProgramChange
          }
          onStatusChange={
            handleStatusChange
          }
          onSessionChange={
            handleSessionChange
          }
          onIntakeChange={
            handleIntakeChange
          }
          onReset={resetFilters}
        />

        {/* Applications */}

        {isError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            Failed to load
            applications.
          </div>
        ) : (
          <ApplicationsTable
            applications={
              data?.data ?? []
            }
            isLoading={
              isLoading || isFetching
            }
            page={
              data?.meta.page ?? page
            }
            totalPages={totalPages}
            totalItems={
              data?.meta.total ?? 0
            }
            limit={
              data?.meta.limit ?? limit
            }
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}