import type { CourseBuilderForm } from "../types/course-builder.types";

interface CourseInfoTabProps {
  form: CourseBuilderForm;
  programs: {
    id: string;
    mnemonic: string;
    name: string;
  }[];
  onChange: (
    changes: Partial<CourseBuilderForm>,
  ) => void;
}

export function CourseInfoTab({
  form,
  programs,
  onChange,
}: CourseInfoTabProps) {
  return (
    <section className="space-y-7">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          Course Info
        </h2>
        <p className="mt-1 text-sm text-stone-500">
          Configure the basic information for this course.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Program
          </label>

          <select
            value={form.program}
            onChange={(event) =>
              onChange({
                program: event.target.value,
              })
            }
            className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-900 outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          >
            <option value="">
              Select program
            </option>

            {programs.map((program) => (
              <option
                key={program.id}
                value={program.id}
              >
                {program.mnemonic} — {program.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Duration
          </label>

          <input
            type="text"
            value={form.duration}
            onChange={(event) =>
              onChange({
                duration: event.target.value,
              })
            }
            placeholder="4 Years"
            className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200">
            Total Semesters
          </label>

          <input
            type="number"
            min={1}
            max={20}
            value={form.totalSemesters}
            onChange={(event) =>
              onChange({
                totalSemesters: Math.max(
                  1,
                  Math.min(
                    20,
                    Number(event.target.value) || 1,
                  ),
                ),
              })
            }
            className="h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
          />
        </div>
      </div>
    </section>
  );
}