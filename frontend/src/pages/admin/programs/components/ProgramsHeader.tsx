import { Plus } from "lucide-react";

// interface ProgramsHeaderProps {
//   totalPrograms: number;
//   onAddProgram: () => void;
// }
interface ProgramsHeaderProps {
  totalPrograms: number;
  onAddProgram: () => void;
  onAddCourse: () => void;
}

export function ProgramsHeader({
  totalPrograms,
  onAddProgram,
  onAddCourse,
}: ProgramsHeaderProps) {
  return (
    <section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Programs
          </h1>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Manage academic programs offered by the institution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onAddProgram}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-stone-900 px-4 text-sm font-medium text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900"
          >
            <Plus className="h-4 w-4" />
            Add Program
          </button>

          <button
            type="button"
            onClick={onAddCourse}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Total Programs
        </p>

        <p className="mt-1 text-2xl font-semibold text-stone-900 dark:text-stone-100">
          {totalPrograms}
        </p>
      </div>
    </section>
  );
}