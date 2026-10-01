import { Trash2 } from "lucide-react";
import type {
  CourseSubjectDto,
} from "@/features/programs/types/course.types";

interface SemesterSubjectCardProps {
  subject: CourseSubjectDto;
  index: number;
  onChange: (
    changes: Partial<CourseSubjectDto>,
  ) => void;
  onRemove: () => void;
}

export function SemesterSubjectCard({
  subject,
  index,
  onChange,
  onRemove,
}: SemesterSubjectCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          Subject {index + 1}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Remove Subject
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Subject Name
          </label>

          <input
            type="text"
            value={subject.subjectName}
            onChange={(event) =>
              onChange({
                subjectName: event.target.value,
              })
            }
            placeholder="Programming Fundamentals"
            className="h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Syllabus Code
          </label>

          <input
            type="text"
            value={subject.syllabusCode}
            onChange={(event) =>
              onChange({
                syllabusCode: event.target.value,
              })
            }
            placeholder="BCA101"
            className="h-11 w-full rounded-lg border border-stone-200 px-3 text-sm outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">
            Elective
          </p>

          <div className="flex gap-5">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={!subject.isElective}
                onChange={() =>
                  onChange({
                    isElective: false,
                    specializedArea: undefined,
                  })
                }
              />
              No
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                checked={subject.isElective}
                onChange={() =>
                  onChange({
                    isElective: true,
                  })
                }
              />
              Yes
            </label>
          </div>
        </div>

        {subject.isElective && (
          <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-900">
            <h4 className="mb-4 text-sm font-semibold">
              Specialized Area
            </h4>

            <div className="space-y-4">
              <input
                type="text"
                value={
                  subject.specializedArea?.subjectName ??
                  ""
                }
                onChange={(event) =>
                  onChange({
                    specializedArea: {
                      subjectName:
                        event.target.value,
                      syllabusCode:
                        subject.specializedArea
                          ?.syllabusCode ?? "",
                    },
                  })
                }
                placeholder="Specialized Subject Name"
                className="h-11 w-full rounded-lg border border-stone-200 px-3 text-sm dark:border-stone-700 dark:bg-stone-950"
              />

              <input
                type="text"
                value={
                  subject.specializedArea?.syllabusCode ??
                  ""
                }
                onChange={(event) =>
                  onChange({
                    specializedArea: {
                      subjectName:
                        subject.specializedArea
                          ?.subjectName ?? "",
                      syllabusCode:
                        event.target.value,
                    },
                  })
                }
                placeholder="Specialized Syllabus Code"
                className="h-11 w-full rounded-lg border border-stone-200 px-3 text-sm dark:border-stone-700 dark:bg-stone-950"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}