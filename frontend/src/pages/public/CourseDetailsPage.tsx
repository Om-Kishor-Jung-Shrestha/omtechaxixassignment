import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  IndianRupee,
  Loader2,
  Receipt,
  Target,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useGetPublicCourseDetailsQuery } from "@/features/programs/api/public-program-catalog.api";

export function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: course,
    isLoading,
    isError,
    refetch,
  } = useGetPublicCourseDetailsQuery(id ?? "", {
    skip: !id,
  });

  const formatFee = (amount: number) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#faf9f6] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2
              size={32}
              className="mx-auto animate-spin text-[#173f35] dark:text-[#d6b56a]"
            />

            <p className="mt-4 text-sm text-stone-500 dark:text-stone-400">
              Loading course details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !course) {
    return (
      <main className="min-h-screen bg-[#faf9f6] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-5 sm:px-6 lg:px-8">
          <div className="w-full rounded-2xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm dark:border-red-900/50 dark:bg-stone-900">
            <h1 className="text-xl font-bold text-red-800 dark:text-red-300">
              Unable to load course
            </h1>

            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              We couldn't retrieve the course details.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#12342d] dark:bg-[#d6b56a] dark:text-stone-950"
              >
                Try Again
              </button>

              <Link
                to="/programs"
                className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Back to Programs
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#faf9f6] text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      {/* Hero */}
      <section className="border-b border-stone-200 dark:border-stone-800">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-[#173f35] dark:text-stone-300 dark:hover:text-[#d6b56a]"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f1eadb] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#8d6b2f] dark:bg-stone-800 dark:text-[#d6b56a]">
                  {course.program.mnemonic}
                </span>

                <span className="rounded-full border border-stone-200 px-3 py-1 text-xs font-semibold text-stone-600 dark:border-stone-700 dark:text-stone-300">
                  {course.duration}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f35] sm:text-5xl dark:text-stone-100">
                {course.program.name}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-7 text-stone-600 dark:text-stone-300">
                {course.overview.introduction}
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Clock3
                    size={19}
                    className="text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold">
                    {course.duration}
                  </p>
                </div>

                <div>
                  <BookOpen
                    size={19}
                    className="text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <p className="mt-3 text-xs text-stone-500 dark:text-stone-400">
                    Semesters
                  </p>

                  <p className="mt-1 font-semibold">
                    {course.totalSemesters}
                  </p>
                </div>

                <div className="col-span-2 border-t border-stone-200 pt-5 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Total Fee
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#173f35] dark:text-stone-100">
                    Rs. {formatFee(course.totalFee)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-8">
            {/* Overview */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1eadb] text-[#173f35] dark:bg-stone-800 dark:text-[#d6b56a]">
                  <GraduationCap size={20} />
                </div>

                <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                  Program Overview
                </h2>
              </div>

              <p className="mt-6 text-sm leading-7 text-stone-600 dark:text-stone-300">
                {course.overview.introduction}
              </p>
            </section>

            {/* Objectives */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1eadb] text-[#173f35] dark:bg-stone-800 dark:text-[#d6b56a]">
                  <Target size={20} />
                </div>

                <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                  Objectives
                </h2>
              </div>

              {course.overview.objectives.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {course.overview.objectives.map(
                    (objective, index) => (
                      <div
                        key={`${objective}-${index}`}
                        className="flex gap-3"
                      >
                        <CheckCircle2
                          size={19}
                          className="mt-0.5 shrink-0 text-[#173f35] dark:text-[#d6b56a]"
                        />

                        <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                          {objective}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
                  No objectives have been provided.
                </p>
              )}
            </section>

            {/* Career Opportunities */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1eadb] text-[#173f35] dark:bg-stone-800 dark:text-[#d6b56a]">
                  <BriefcaseBusiness size={20} />
                </div>

                <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                  Career Opportunities
                </h2>
              </div>

              {course.overview.careerOpportunities.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.overview.careerOpportunities.map(
                    (career, index) => (
                      <div
                        key={`${career}-${index}`}
                        className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-950"
                      >
                        <div className="flex gap-3">
                          <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0 text-[#173f35] dark:text-[#d6b56a]"
                          />

                          <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                            {career}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
                  No career opportunities have been provided.
                </p>
              )}
            </section>

            {/* Highlights */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                Program Highlights
              </h2>

              {course.highlights.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.highlights.map((highlight, index) => (
                    <div
                      key={`${highlight}-${index}`}
                      className="flex gap-3 rounded-xl border border-stone-200 p-4 dark:border-stone-800"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#173f35] dark:text-[#d6b56a]"
                      />

                      <p className="text-sm leading-6 text-stone-600 dark:text-stone-300">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-stone-500 dark:text-stone-400">
                  No highlights have been provided.
                </p>
              )}
            </section>

            {/* Semester Structure */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1eadb] text-[#173f35] dark:bg-stone-800 dark:text-[#d6b56a]">
                  <BookOpen size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                    Semester Structure
                  </h2>

                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {course.totalSemesters} semesters
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                {course.semesters.map((semester) => (
                  <div
                    key={semester.semesterNumber}
                    className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-center justify-between bg-stone-50 px-5 py-4 dark:bg-stone-950">
                      <h3 className="font-bold text-[#173f35] dark:text-stone-100">
                        Semester {semester.semesterNumber}
                      </h3>

                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                        {semester.subjects.length}{" "}
                        {semester.subjects.length === 1
                          ? "Subject"
                          : "Subjects"}
                      </span>
                    </div>

                    <div className="divide-y divide-stone-200 dark:divide-stone-800">
                      {semester.subjects.map((subject, index) => (
                        <div
                          key={`${subject.syllabusCode}-${index}`}
                          className="px-5 py-4"
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-stone-800 dark:text-stone-200">
                                  {subject.subjectName}
                                </p>

                                {subject.isElective && (
                                  <span className="rounded-full bg-[#f1eadb] px-2 py-0.5 text-[11px] font-semibold text-[#8d6b2f] dark:bg-stone-800 dark:text-[#d6b56a]">
                                    Elective
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                                {subject.syllabusCode}
                              </p>
                            </div>

                            {subject.specializedArea && (
                              <div className="rounded-lg bg-stone-50 px-3 py-2 dark:bg-stone-950">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                                  Specialized Area
                                </p>

                                <p className="mt-1 text-sm font-medium text-stone-700 dark:text-stone-300">
                                  {
                                    subject.specializedArea
                                      .subjectName
                                  }
                                </p>

                                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                                  {
                                    subject.specializedArea
                                      .syllabusCode
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fee Structure */}
            <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1eadb] text-[#173f35] dark:bg-stone-800 dark:text-[#d6b56a]">
                  <Receipt size={20} />
                </div>

                <h2 className="text-xl font-bold text-[#173f35] dark:text-stone-100">
                  Fee Structure
                </h2>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="divide-y divide-stone-200 dark:divide-stone-800">
                  {course.semesterFees.map((fee) => (
                    <div
                      key={fee.semesterNumber}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                        Semester {fee.semesterNumber}
                      </span>

                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        Rs. {formatFee(fee.amount)}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between bg-stone-50 px-5 py-5 dark:bg-stone-950">
                    <span className="font-bold text-[#173f35] dark:text-stone-100">
                      Total Fee
                    </span>

                    <span className="text-xl font-bold text-[#173f35] dark:text-[#d6b56a]">
                      Rs. {formatFee(course.totalFee)}
                    </span>
                  </div>
                </div>
              </div>

              {course.feeStructureFile?.url && (
                <a
                  href={course.feeStructureFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#173f35] px-4 py-2.5 text-sm font-semibold text-[#173f35] transition hover:bg-[#173f35] hover:text-white dark:border-[#d6b56a] dark:text-[#d6b56a] dark:hover:bg-[#d6b56a] dark:hover:text-stone-950"
                >
                  <Receipt size={17} />
                  View Fee Structure
                </a>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <h2 className="text-lg font-bold text-[#173f35] dark:text-stone-100">
                Program Summary
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <GraduationCap
                    size={19}
                    className="mt-0.5 shrink-0 text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Program
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {course.program.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock3
                    size={19}
                    className="mt-0.5 shrink-0 text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {course.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen
                    size={19}
                    className="mt-0.5 shrink-0 text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Total Semesters
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {course.totalSemesters}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IndianRupee
                    size={19}
                    className="mt-0.5 shrink-0 text-[#8d6b2f] dark:text-[#d6b56a]"
                  />

                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Total Fee
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Rs. {formatFee(course.totalFee)}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/programs"
                className="mt-7 block rounded-lg bg-[#173f35] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#12342d] dark:bg-[#d6b56a] dark:text-stone-950 dark:hover:bg-[#c69a45]"
              >
                Explore Other Programs
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}