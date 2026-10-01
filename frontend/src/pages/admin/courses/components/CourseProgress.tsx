import type {
  CourseBuilderTab,
} from "../types/course-builder.types";

interface CourseProgressProps {
  activeTab: CourseBuilderTab;
}

const steps: {
  id: CourseBuilderTab;
  label: string;
}[] = [
  {
    id: "course-info",
    label: "Course Info",
  },
  {
    id: "semesters",
    label: "Semesters",
  },
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "highlights",
    label: "Highlights",
  },
  {
    id: "fees",
    label: "Fees",
  },
];

export function CourseProgress({
  activeTab,
}: CourseProgressProps) {
  const activeIndex = steps.findIndex(
    (step) => step.id === activeTab,
  );

  return (
    <div className="hidden rounded-xl border border-stone-200 bg-white p-5 lg:block dark:border-stone-800 dark:bg-stone-950">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
        Course Setup
      </p>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const completed =
            index < activeIndex;
          const active =
            index === activeIndex;

          return (
            <div
              key={step.id}
              className="flex items-center gap-3"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  completed || active
                    ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                    : "border border-stone-300 text-stone-400 dark:border-stone-700"
                }`}
              >
                {completed
                  ? "✓"
                  : index + 1}
              </div>

              <span
                className={`text-sm ${
                  active
                    ? "font-semibold text-stone-900 dark:text-stone-100"
                    : "text-stone-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}