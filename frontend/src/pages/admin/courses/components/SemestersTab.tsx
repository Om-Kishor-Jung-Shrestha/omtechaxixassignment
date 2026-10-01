import { Plus } from "lucide-react";

import type {
  CourseSemesterDto,
  CourseSubjectDto,
} from "@/features/programs/types/course.types";

import { SemesterSubjectCard } from "./SemesterSubjectCard";

interface SemestersTabProps {
  totalSemesters: number;
  semesters: CourseSemesterDto[];
  activeSemester: number;
  onSemesterChange: (semester: number) => void;
  onAddSubject: (semesterNumber: number) => void;
  onUpdateSubject: (
    semesterNumber: number,
    subjectIndex: number,
    changes: Partial<CourseSubjectDto>,
  ) => void;
  onRemoveSubject: (
    semesterNumber: number,
    subjectIndex: number,
  ) => void;
}

export function SemestersTab({
  totalSemesters,
  semesters,
  activeSemester,
  onSemesterChange,
  onAddSubject,
  onUpdateSubject,
  onRemoveSubject,
}: SemestersTabProps) {
  const semester =
    semesters.find(
      (item) =>
        item.semesterNumber === activeSemester,
    ) ??
    ({
      semesterNumber: activeSemester,
      subjects: [],
    } satisfies CourseSemesterDto);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          Semesters
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Add the subjects belonging to each semester.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from(
          { length: totalSemesters },
          (_, index) => index + 1,
        ).map((semesterNumber) => (
          <button
            key={semesterNumber}
            type="button"
            onClick={() =>
              onSemesterChange(semesterNumber)
            }
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeSemester === semesterNumber
                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                : "border border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-900"
            }`}
          >
            Semester {semesterNumber}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">
            Semester {activeSemester}
          </h3>

          <p className="mt-1 text-sm text-stone-500">
            {semester.subjects.length} subject
            {semester.subjects.length === 1
              ? ""
              : "s"}
          </p>
        </div>

        {semester.subjects.map(
          (subject, index) => (
            <SemesterSubjectCard
              key={`${activeSemester}-${index}`}
              subject={subject}
              index={index}
              onChange={(changes) =>
                onUpdateSubject(
                  activeSemester,
                  index,
                  changes,
                )
              }
              onRemove={() =>
                onRemoveSubject(
                  activeSemester,
                  index,
                )
              }
            />
          ),
        )}

        <button
          type="button"
          onClick={() =>
            onAddSubject(activeSemester)
          }
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-stone-300 px-4 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-900"
        >
          <Plus className="h-4 w-4" />
          Add Subject
        </button>
      </div>
    </section>
  );
}