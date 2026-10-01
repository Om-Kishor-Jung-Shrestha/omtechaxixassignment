
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetCourseQuery } from "@/features/programs/api/courses.api";
import { useGetProgramsQuery } from "@/features/programs/api/program.api";

export function CourseDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [activeYear, setActiveYear] = useState(1);

  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseQuery(
    {
      id: id ?? "",
    },
    {
      skip: !id,
    },
  );

  const { data: programsData } = useGetProgramsQuery({
    page: 1,
    limit: 100,
  });

  const programs = programsData?.items ?? [];

  const selectedProgram = useMemo(
    () =>
      programs.find(
        (program) => program.id === course?.program,
      ),
    [programs, course?.program],
  );

  const years = useMemo(() => {
    if (!course) {
      return [];
    }

    return Array.from(
      {
        length: Math.ceil(course.totalSemesters / 2),
      },
      (_, index) => index + 1,
    );
  }, [course]);

  const activeYearSemesters = useMemo(() => {
    if (!course) {
      return [];
    }

    const firstSemester = (activeYear - 1) * 2 + 1;
    const lastSemester = firstSemester + 1;

    return course.semesters.filter(
      (semester) =>
        semester.semesterNumber >= firstSemester &&
        semester.semesterNumber <= lastSemester,
    );
  }, [course, activeYear]);

  const activeYearFee = useMemo(() => {
    if (!course) {
      return 0;
    }

    return activeYearSemesters.reduce(
      (total, semester) => {
        const semesterFee = course.semesterFees.find(
          (fee) =>
            fee.semesterNumber ===
            semester.semesterNumber,
        );

        return total + (semesterFee?.amount ?? 0);
      },
      0,
    );
  }, [course, activeYearSemesters]);

  const formatFee = (amount: number) => {
    return new Intl.NumberFormat().format(amount);
  };

  const getYearLabel = (year: number) => {
    return `Year ${String(year).padStart(2, "0")}`;
  };

  const getSemesterTitle = (semesterNumber: number) => {
    return semesterNumber % 2 === 1
      ? "Semester I"
      : "Semester II";
  };

  if (isLoading) {
    return (
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="rounded-xl border border-stone-200 bg-white p-10 text-center dark:border-stone-800 dark:bg-stone-950">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading course details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px] space-y-5">
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to Courses
          </button>

          <div className="rounded-xl border border-red-200 bg-red-50 p-8 dark:border-red-900/50 dark:bg-red-950/30">
            <h1 className="text-lg font-semibold text-red-800 dark:text-red-300">
              Unable to load course
            </h1>

            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              The requested course could not be found or
              could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        {/* =====================================================
            Header
        ====================================================== */}
        <section className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/courses")
                }
                className="mb-4 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                ← Back to Courses
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {selectedProgram?.name ??
                      "Course Details"}
                  </h1>

                  {selectedProgram?.mnemonic && (
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20">
                      {selectedProgram.mnemonic}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  View complete course information,
                  curriculum, semester fees, and course
                  structure.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/courses/${course.id}/edit`,
                )
              }
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              Edit Course
            </button>
          </div>
        </section>

        {/* =====================================================
            Course Information
        ====================================================== */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Course Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Program */}
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Program
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {selectedProgram?.name ??
                  course.program}
              </p>

              {selectedProgram?.mnemonic && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {selectedProgram.mnemonic}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Duration
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {course.duration}
              </p>
            </div>

            {/* Semesters */}
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Total Semesters
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {course.totalSemesters}
              </p>
            </div>

            {/* Total Fee */}
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Total Fee
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatFee(course.totalFee)}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            Overview
        ====================================================== */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Overview
            </h2>
          </div>

          <div className="space-y-7 p-6">
            {/* Introduction */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Introduction
              </h3>

              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-300">
                {course.overview.introduction ||
                  "No introduction provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
              {/* Objectives */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Objectives
                </h3>

                {course.overview.objectives.length >
                0 ? (
                  <ul className="mt-3 space-y-3">
                    {course.overview.objectives.map(
                      (objective, index) => (
                        <li
                          key={`${objective}-${index}`}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                          <span>{objective}</span>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    No objectives provided.
                  </p>
                )}
              </div>

              {/* Career Opportunities */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Career Opportunities
                </h3>

                {course.overview.careerOpportunities
                  .length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {course.overview.careerOpportunities.map(
                      (opportunity, index) => (
                        <li
                          key={`${opportunity}-${index}`}
                          className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />

                          <span>
                            {opportunity}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    No career opportunities provided.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            Highlights
        ====================================================== */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Course Highlights
            </h2>
          </div>

          <div className="p-6">
            {course.highlights.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {course.highlights.map(
                  (highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary dark:bg-primary/20">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                        {highlight}
                      </p>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No highlights provided.
              </p>
            )}
          </div>
        </section>

        {/* =====================================================
            Course Structure
        ====================================================== */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Course Structure
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Explore the subjects offered in each
              academic year.
            </p>
          </div>

          {/* Year Tabs */}
         <div className="grid grid-cols-2 gap-2 rounded-xl border border-stone-200 bg-white p-2 dark:border-stone-800 dark:bg-stone-950 sm:grid-cols-4">
  {years.map((year) => {
    const isActive = activeYear === year;

    return (
      <button
        key={year}
        type="button"
        onClick={() => setActiveYear(year)}
        className={[
          "relative rounded-lg border px-4 py-3 text-sm font-semibold transition-all",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 dark:focus-visible:ring-stone-600",
          isActive
            ? [
                "border-stone-300",
                "bg-stone-100",
                "text-gray-900",
                "shadow-sm",
                "dark:border-stone-700",
                "dark:bg-stone-800",
                "dark:text-gray-100",
              ].join(" ")
            : [
                "border-transparent",
                "bg-transparent",
                "text-gray-600",
                "hover:border-stone-200",
                "hover:bg-stone-50",
                "hover:text-gray-900",
                "dark:text-gray-400",
                "dark:hover:border-stone-700",
                "dark:hover:bg-stone-900",
                "dark:hover:text-gray-100",
              ].join(" "),
        ].join(" ")}
      >
        {getYearLabel(year)}

        {isActive && (
          <span
            className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-gray-900 dark:bg-gray-100"
            aria-hidden="true"
          />
        )}
      </button>
    );
  })}
</div>

          {/* Semester Cards */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {activeYearSemesters.map((semester) => (
              <div
                key={semester.semesterNumber}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950"
              >
                {/* Semester Header */}
                <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-4 dark:border-stone-800 dark:bg-stone-900">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {getSemesterTitle(
                        semester.semesterNumber,
                      )}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Semester{" "}
                      {semester.semesterNumber}
                    </p>
                  </div>

                  <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-stone-700 dark:bg-stone-950 dark:text-gray-400">
                    {semester.subjects.length}{" "}
                    {semester.subjects.length === 1
                      ? "Subject"
                      : "Subjects"}
                  </span>
                </div>

                {/* Subject List */}
                <div className="p-5">
                  {semester.subjects.length > 0 ? (
                    <div className="space-y-3">
                      {semester.subjects.map(
                        (subject, index) => (
                          <div
                            key={`${semester.semesterNumber}-${subject.syllabusCode}-${index}`}
                            className="rounded-lg border border-stone-200 bg-white p-3 transition hover:border-stone-300 hover:bg-stone-50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700 dark:hover:bg-stone-800"
                          >
                            <div className="flex items-start gap-3">
                              {/* Number */}
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary dark:bg-primary/20">
                                {index + 1}
                              </span>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                    {
                                      subject.subjectName
                                    }
                                  </p>

                                  {subject.isElective && (
                                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                                      Elective
                                    </span>
                                  )}
                                </div>

                                {subject.syllabusCode && (
                                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {
                                      subject.syllabusCode
                                    }
                                  </p>
                                )}

                                {/* Specialized Area */}
                                {subject.specializedArea && (
                                  <div className="mt-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 dark:border-stone-700 dark:bg-stone-800">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                      Specialized Area
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                                      {
                                        subject
                                          .specializedArea
                                          .subjectName
                                      }
                                    </p>

                                    {subject
                                      .specializedArea
                                      .syllabusCode && (
                                      <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                                        {
                                          subject
                                            .specializedArea
                                            .syllabusCode
                                        }
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-stone-300 px-6 py-10 text-center dark:border-stone-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No subjects added for this
                        semester.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Year Total Fee */}
          <div className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Total Fee
                </p>

                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
                  {getYearLabel(activeYear)}
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Combined fee for the semesters in this
                  academic year.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatFee(activeYearFee)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            Fee Structure
        ====================================================== */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Fee Structure
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Uploaded fee structure document for this
              course.
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-stone-800 dark:bg-stone-900">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Fee Structure File
                </p>

                <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <p>
                    Format:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {course.feeStructureFile
                        .format || "Unknown"}
                    </span>
                  </p>

                  <p>
                    Type:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {
                        course.feeStructureFile
                          .resourceType
                      }
                    </span>
                  </p>
                </div>
              </div>

              {course.feeStructureFile.url && (
                <a
                  href={course.feeStructureFile.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-gray-300 dark:hover:bg-stone-900"
                >
                  View Fee Structure
                </a>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            Semester Fee Breakdown
        ====================================================== */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Semester Fee Breakdown
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fee amount assigned to each semester.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800">
              <thead className="bg-stone-50 dark:bg-stone-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Semester
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Fee
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-200 bg-white dark:divide-stone-800 dark:bg-stone-950">
                {course.semesterFees.map(
                  (semesterFee) => (
                    <tr
                      key={semesterFee.semesterNumber}
                      className="transition hover:bg-stone-50 dark:hover:bg-stone-900"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Semester{" "}
                        {semesterFee.semesterNumber}
                      </td>

                      <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-300">
                        {formatFee(semesterFee.amount)}
                      </td>
                    </tr>
                  ),
                )}

                <tr className="bg-stone-50 dark:bg-stone-900">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Total Fee
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                    {formatFee(course.totalFee)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================
            Bottom Actions
        ====================================================== */}
        <div className="flex flex-col gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:justify-end dark:border-stone-800">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/courses")
            }
            className="rounded-md border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-gray-300 dark:hover:bg-stone-900"
          >
            Back to Courses
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/admin/courses/${course.id}/edit`,
              )
            }
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
}