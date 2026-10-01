import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import {
//   useGetApplicationQuery,
//   useUpdateApplicationStatusMutation,
// } from "@/features/applications/api/application.api";

import type { ApplicationStatus } from "@/types/application.types";

import { ApplicationDocuments } from "./components/application-documents";
import { ApplicationInfoCard } from "./components/application-info-card";
import { ApplicationStatusBadge } from "./components/application-status-badge";
import { useGetApplicationQuery, useUpdateApplicationStatusMutation } from "@/features/application/api/application.api";

function getApplicantName(
  firstName: string,
  middleName: string | undefined,
  lastName: string,
) {
  return [firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatus | null>(null);

  const {
    data: application,
    isLoading,
    isError,
  } = useGetApplicationQuery(
    { id: id ?? "" },
    {
      skip: !id,
    },
  );

  const [
    updateApplicationStatus,
    { isLoading: isUpdatingStatus },
  ] = useUpdateApplicationStatusMutation();

  const handleStatusUpdate = async (
    status: ApplicationStatus,
  ) => {
    if (!id) return;

    if (
      status === "rejected" &&
      !window.confirm(
        "Are you sure you want to reject this application?",
      )
    ) {
      return;
    }

    try {
      await updateApplicationStatus({
        id,
        status,
      }).unwrap();

      setSelectedStatus(null);
    } catch {
      // Keep the current page state.
      // Project-level toast handling can be connected here.
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-48 animate-pulse rounded-xl bg-stone-100 dark:bg-stone-900" />
        <div className="h-48 animate-pulse rounded-xl bg-stone-100 dark:bg-stone-900" />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
        <p className="text-sm text-red-700 dark:text-red-300">
          Unable to load this application.
        </p>

        <button
          type="button"
          onClick={() => navigate("/admin/applications")}
          className="mt-4 text-sm font-medium text-red-800 underline dark:text-red-200"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  const applicantName = getApplicantName(
    application.firstName,
    application.middleName,
    application.lastName,
  );

  const currentStatus =
    selectedStatus ?? application.status;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/admin/applications"
            className="text-sm font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            ← Back to Applications
          </Link>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Application Details
          </h1>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Application ID: {application.id}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ApplicationStatusBadge
            status={application.status}
          />

          <select
            value={currentStatus}
            disabled={isUpdatingStatus}
            onChange={(event) => {
              const status =
                event.target.value as ApplicationStatus;

              setSelectedStatus(status);
              void handleStatusUpdate(status);
            }}
            className="h-10 rounded-lg border border-stone-300 bg-white px-3 text-sm font-medium text-stone-800 outline-none focus:border-stone-500 focus:ring-2 focus:ring-stone-200 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
          >
            <option value="pending">Pending</option>
            <option value="under_review">
              Under Review
            </option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <section className="rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col gap-4 border-b border-stone-200 p-5 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Applicant
            </p>

            <h2 className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-100">
              {applicantName}
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={
                isUpdatingStatus ||
                application.status === "approved"
              }
              onClick={() =>
                void handleStatusUpdate("approved")
              }
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Approve
            </button>

            <button
              type="button"
              disabled={
                isUpdatingStatus ||
                application.status === "rejected"
              }
              onClick={() =>
                void handleStatusUpdate("rejected")
              }
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                Email
              </p>
              <p className="mt-1 text-sm text-stone-900 dark:text-stone-100">
                {application.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                Phone
              </p>
              <p className="mt-1 text-sm text-stone-900 dark:text-stone-100">
                {application.phone}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                Created
              </p>
              <p className="mt-1 text-sm text-stone-900 dark:text-stone-100">
                {formatDate(application.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ApplicationInfoCard
        title="Applicant Information"
        items={[
          {
            label: "First Name",
            value: application.firstName,
          },
          {
            label: "Middle Name",
            value: application.middleName,
          },
          {
            label: "Last Name",
            value: application.lastName,
          },
          {
            label: "Email",
            value: application.email,
          },
          {
            label: "Phone",
            value: application.phone,
          },
          {
            label: "Address",
            value: application.address,
          },
        ]}
      />

      {/* <ApplicationInfoCard
        title="Admission Information"
        items={[
          {
            label: "Program",
            value: application.program,
          },
          {
            label: "Admission Session",
            value: application.admissionSession,
          },
          {
            label: "Admission Intake",
            value: application.admissionIntake,
          },
          {
            label: "Application Status",
            value: application.status,
          },
        ]}
      /> */}
      <ApplicationInfoCard
  title="Admission Information"
  items={[
    {
      label: "Program",
      value: `${application.program.mnemonic} — ${application.program.name}`,
    },
    {
      label: "Admission Session",
      value: application.admissionSession,
    },
    {
      label: "Admission Intake",
      value: application.admissionIntake,
    },
    {
      label: "Application Status",
      value: application.status,
    },
  ]}
/>

      <ApplicationInfoCard
        title="Academic Information"
        items={[
          {
            label: "Academic Qualification",
            value: application.academicQualification,
          },
          {
            label: "School / College",
            value:
              application.academicHistory.collegeOrSchool,
          },
          {
            label: "Board",
            value: application.academicHistory.board,
          },
          {
            label: "Grade / GPA",
            value: application.academicHistory.gradeOrGpa,
          },
        ]}
      />

      <ApplicationDocuments application={application} />

      <div className="text-xs text-stone-500 dark:text-stone-400">
        Last updated: {formatDate(application.updatedAt)}
      </div>
    </div>
  );
}