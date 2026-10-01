
import {
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useCreateCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
} from "@/features/programs/api/courses.api";

import {
  useGetProgramsQuery,
} from "@/features/programs/api/program.api";

import type {
  CourseSemesterDto,
  CourseSubjectDto,
} from "@/features/programs/types/course.types";

import type {
  CourseBuilderForm,
  CourseBuilderTab,
} from "./types/course-builder.types";

import { CourseBuilderHeader } from "./components/CourseBuilderHeader";
import { CourseBuilderTabs } from "./components/CourseBuilderTabs";
import { CourseInfoTab } from "./components/CourseInfoTab";
import { SemestersTab } from "./components/SemestersTab";
import { OverviewTab } from "./components/OverviewTab";
import { HighlightsTab } from "./components/HighlightsTab";
import { FeesTab } from "./components/FeesTab";
import { CourseProgress } from "./components/CourseProgress";
import { CourseBuilderFooter } from "./components/CourseBuilderFooter";

function createSemesters(
  totalSemesters: number,
): CourseSemesterDto[] {
  return Array.from(
    { length: totalSemesters },
    (_, index) => ({
      semesterNumber: index + 1,
      subjects: [],
    }),
  );
}

function createSemesterFees(
  totalSemesters: number,
) {
  return Array.from(
    { length: totalSemesters },
    (_, index) => ({
      semesterNumber: index + 1,
      amount: 0,
    }),
  );
}

const initialForm: CourseBuilderForm = {
  program: "",
  duration: "",
  totalSemesters: 8,

  overview: {
    introduction: "",
    objectives: [],
    careerOpportunities: [],
  },

  highlights: [],

  semesters: createSemesters(8),

  feeStructureFile: null,

  semesterFees: createSemesterFees(8),
};

export function CourseBuilderPage() {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const isEditMode = Boolean(id);

  const [activeTab, setActiveTab] =
    useState<CourseBuilderTab>(
      "course-info",
    );

  const [activeSemester, setActiveSemester] =
    useState(1);

  const [form, setForm] =
    useState<CourseBuilderForm>(
      initialForm,
    );

  /*
   * --------------------------------------------------
   * COURSE QUERY
   * --------------------------------------------------
   *
   * Create page:
   *   /admin/courses/new
   *   -> query is skipped
   *
   * Edit page:
   *   /admin/courses/:id/edit
   *   -> GET /courses/:id
   */
  const {
    data: course,
    isLoading: isLoadingCourse,
    isFetching: isFetchingCourse,
    isError: isCourseError,
  } = useGetCourseQuery(
    {
      id: id as string,
    },
    {
      skip: !isEditMode || !id,
    },
  );

  /*
   * --------------------------------------------------
   * PROGRAMS
   * --------------------------------------------------
   */
  const {
    data: programsData,
    isLoading: isLoadingPrograms,
  } = useGetProgramsQuery({
    page: 1,
    limit: 100,
  });

  /*
   * --------------------------------------------------
   * MUTATIONS
   * --------------------------------------------------
   */
  const [
    createCourse,
    {
      isLoading: isCreating,
    },
  ] = useCreateCourseMutation();

  const [
    updateCourse,
    {
      isLoading: isUpdating,
    },
  ] = useUpdateCourseMutation();

  /*
   * --------------------------------------------------
   * DERIVED DATA
   * --------------------------------------------------
   */
  const programs = useMemo(
    () => programsData?.items ?? [],
    [programsData?.items],
  );

  const selectedProgram = useMemo(
    () =>
      programs.find(
        (program) =>
          program.id === form.program,
      ),
    [programs, form.program],
  );

  const isSaving =
    isCreating || isUpdating;

  /*
   * --------------------------------------------------
   * POPULATE FORM IN EDIT MODE
   * --------------------------------------------------
   *
   * The API response is converted into exactly
   * the same shape used by the existing builder.
   *
   * startTransition prevents the synchronous
   * setState-in-effect lint error.
   */
  useEffect(() => {
    if (!course || !isEditMode) {
      return;
    }

    const nextForm: CourseBuilderForm = {
      program: course.program,

      duration: course.duration,

      totalSemesters:
        course.totalSemesters,

      overview: {
        introduction:
          course.overview.introduction,

        objectives: [
          ...course.overview.objectives,
        ],

        careerOpportunities: [
          ...course.overview
            .careerOpportunities,
        ],
      },

      highlights: [
        ...course.highlights,
      ],

      semesters:
        course.semesters.map(
          (semester) => ({
            semesterNumber:
              semester.semesterNumber,

            subjects:
              semester.subjects.map(
                (subject) => ({
                  subjectName:
                    subject.subjectName,

                  syllabusCode:
                    subject.syllabusCode,

                  isElective:
                    subject.isElective,

                  specializedArea:
                    subject.specializedArea
                      ? {
                          subjectName:
                            subject
                              .specializedArea
                              .subjectName,

                          syllabusCode:
                            subject
                              .specializedArea
                              .syllabusCode,
                        }
                      : undefined,
                }),
              ),
          }),
        ),

      feeStructureFile: {
        public_id:
          course.feeStructureFile
            .public_id,

        url:
          course.feeStructureFile.url,

        resourceType:
          course.feeStructureFile
            .resourceType,

        format:
          course.feeStructureFile.format,
      },

      semesterFees:
        course.semesterFees.map(
          (fee) => ({
            semesterNumber:
              fee.semesterNumber,

            amount: fee.amount,
          }),
        ),
    };

    startTransition(() => {
      setForm(nextForm);
      setActiveSemester(1);
    });
  }, [course, isEditMode]);

  /*
   * --------------------------------------------------
   * FORM HELPERS
   * --------------------------------------------------
   */
  function updateForm(
    changes: Partial<CourseBuilderForm>,
  ) {
    setForm((current) => ({
      ...current,
      ...changes,
    }));
  }

  function handleTotalSemestersChange(
    totalSemesters: number,
  ) {
    const safeTotal = Math.max(
      1,
      Math.min(20, totalSemesters),
    );

    setForm((current) => ({
      ...current,

      totalSemesters: safeTotal,

      semesters:
        createSemesters(safeTotal),

      semesterFees:
        createSemesterFees(safeTotal),
    }));

    setActiveSemester(1);
  }

  /*
   * --------------------------------------------------
   * SUBJECT HANDLERS
   * --------------------------------------------------
   */
  function handleAddSubject(
    semesterNumber: number,
  ) {
    setForm((current) => ({
      ...current,

      semesters:
        current.semesters.map(
          (semester) =>
            semester.semesterNumber ===
            semesterNumber
              ? {
                  ...semester,

                  subjects: [
                    ...semester.subjects,

                    {
                      subjectName: "",
                      syllabusCode: "",
                      isElective: false,
                    },
                  ],
                }
              : semester,
        ),
    }));
  }

  function handleUpdateSubject(
    semesterNumber: number,
    subjectIndex: number,
    changes: Partial<CourseSubjectDto>,
  ) {
    setForm((current) => ({
      ...current,

      semesters:
        current.semesters.map(
          (semester) =>
            semester.semesterNumber ===
            semesterNumber
              ? {
                  ...semester,

                  subjects:
                    semester.subjects.map(
                      (
                        subject,
                        index,
                      ) =>
                        index ===
                        subjectIndex
                          ? {
                              ...subject,
                              ...changes,
                            }
                          : subject,
                    ),
                }
              : semester,
        ),
    }));
  }

  function handleRemoveSubject(
    semesterNumber: number,
    subjectIndex: number,
  ) {
    setForm((current) => ({
      ...current,

      semesters:
        current.semesters.map(
          (semester) =>
            semester.semesterNumber ===
            semesterNumber
              ? {
                  ...semester,

                  subjects:
                    semester.subjects.filter(
                      (_, index) =>
                        index !==
                        subjectIndex,
                    ),
                }
              : semester,
        ),
    }));
  }

  /*
   * --------------------------------------------------
   * SAVE
   * --------------------------------------------------
   */
  async function handleSave() {
    /*
     * Program validation
     */
    if (!form.program) {
      window.alert(
        "Please select a program.",
      );

      setActiveTab("course-info");

      return;
    }

    /*
     * Duration validation
     */
    if (!form.duration.trim()) {
      window.alert(
        "Please enter the course duration.",
      );

      setActiveTab("course-info");

      return;
    }

    /*
     * Fee structure validation
     */
    if (!form.feeStructureFile) {
      window.alert(
        "Please upload the fee structure file.",
      );

      setActiveTab("fees");

      return;
    }

    try {
      /*
       * ----------------------------------------------
       * EDIT
       * ----------------------------------------------
       */
      if (isEditMode && id) {
        await updateCourse({
          id,

          program:
            form.program,

          duration:
            form.duration.trim(),

          totalSemesters:
            form.totalSemesters,

          overview:
            form.overview,

          highlights:
            form.highlights,

          semesters:
            form.semesters,

          feeStructureFile:
            form.feeStructureFile,

          semesterFees:
            form.semesterFees,
        }).unwrap();

        window.alert(
          "Course updated successfully.",
        );
      } else {
        /*
         * --------------------------------------------
         * CREATE
         * --------------------------------------------
         */
        await createCourse({
          ...form,

          duration:
            form.duration.trim(),

          feeStructureFile:
            form.feeStructureFile,
        }).unwrap();

        window.alert(
          "Course created successfully.",
        );
      }

      /*
       * Return to Course Management after
       * either create or update.
       */
      navigate("/admin/courses");
    } catch {
      window.alert(
        isEditMode
          ? "Unable to update course."
          : "Unable to create course.",
      );
    }
  }

  /*
   * --------------------------------------------------
   * LOADING STATE
   * --------------------------------------------------
   */
  if (
    isEditMode &&
    (isLoadingCourse ||
      isLoadingPrograms)
  ) {
    return (
      <div className="w-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="rounded-xl border border-stone-200 bg-white p-10 text-center dark:border-stone-800 dark:bg-stone-950">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Loading course...
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please wait while the course
              information is loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * ERROR STATE
   * --------------------------------------------------
   */
  if (
    isEditMode &&
    isCourseError
  ) {
    return (
      <div className="w-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
            <h2 className="text-sm font-semibold text-red-800 dark:text-red-300">
              Unable to load course
            </h2>

            <p className="mt-1 text-sm text-red-700 dark:text-red-400">
              The course information could
              not be loaded.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/courses",
                )
              }
              className="mt-4 rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * MAIN BUILDER
   * --------------------------------------------------
   */
  return (
    <div className="w-full bg-stone-50 px-4 py-6 text-gray-900 dark:bg-stone-900 dark:text-gray-100 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        <CourseBuilderHeader
          programName={
            selectedProgram?.name
          }
          programMnemonic={
            selectedProgram?.mnemonic
          }
        />

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <CourseProgress
            activeTab={activeTab}
          />

          <section className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
            <CourseBuilderTabs
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            <div className="p-6">
              {activeTab ===
                "course-info" && (
                <CourseInfoTab
                  form={form}
                  programs={programs}
                  onChange={(changes) => {
                    if (
                      changes.totalSemesters !==
                      undefined
                    ) {
                      handleTotalSemestersChange(
                        changes.totalSemesters,
                      );
                    } else {
                      updateForm(changes);
                    }
                  }}
                />
              )}

              {activeTab ===
                "semesters" && (
                <SemestersTab
                  totalSemesters={
                    form.totalSemesters
                  }
                  semesters={
                    form.semesters
                  }
                  activeSemester={
                    activeSemester
                  }
                  onSemesterChange={
                    setActiveSemester
                  }
                  onAddSubject={
                    handleAddSubject
                  }
                  onUpdateSubject={
                    handleUpdateSubject
                  }
                  onRemoveSubject={
                    handleRemoveSubject
                  }
                />
              )}

              {activeTab ===
                "overview" && (
                <OverviewTab
                  overview={
                    form.overview
                  }
                  onChange={(
                    overview,
                  ) =>
                    updateForm({
                      overview,
                    })
                  }
                />
              )}

              {activeTab ===
                "highlights" && (
                <HighlightsTab
                  highlights={
                    form.highlights
                  }
                  onChange={(
                    highlights,
                  ) =>
                    updateForm({
                      highlights,
                    })
                  }
                />
              )}

              {activeTab === "fees" && (
                <FeesTab
                  totalSemesters={
                    form.totalSemesters
                  }
                  semesterFees={
                    form.semesterFees
                  }
                  feeStructureFile={
                    form.feeStructureFile
                  }
                  onSemesterFeesChange={(
                    semesterFees,
                  ) =>
                    setForm(
                      (previous) => ({
                        ...previous,
                        semesterFees,
                      }),
                    )
                  }
                  onFeeStructureFileChange={(
                    feeStructureFile,
                  ) =>
                    setForm(
                      (previous) => ({
                        ...previous,
                        feeStructureFile,
                      }),
                    )
                  }
                />
              )}
            </div>

            <CourseBuilderFooter
              onCancel={() =>
                navigate(
                  "/admin/courses",
                )
              }
              onSave={handleSave}
              isSaving={
                isSaving ||
                isLoadingPrograms ||
                isFetchingCourse
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
}
