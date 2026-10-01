import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseBuilderHeaderProps {
  programName?: string;
  programMnemonic?: string;
}

export function CourseBuilderHeader({
  programName,
  programMnemonic,
}: CourseBuilderHeaderProps) {
  const navigate = useNavigate();

  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={() => navigate("/admin/programs")}
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Programs
      </button>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          Add Course
        </h1>

        {programName && (
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            {programMnemonic} — {programName}
          </p>
        )}
      </div>
    </section>
  );
}