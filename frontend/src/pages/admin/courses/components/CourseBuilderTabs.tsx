import type { CourseBuilderTab } from "../types/course-builder.types";

interface CourseBuilderTabsProps {
  activeTab: CourseBuilderTab;
  onChange: (tab: CourseBuilderTab) => void;
}

const tabs: {
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

export function CourseBuilderTabs({
  activeTab,
  onChange,
}: CourseBuilderTabsProps) {
  return (
    <div className="overflow-x-auto border-b border-stone-200 dark:border-stone-800">
      <div className="flex min-w-max">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`border-b-2 px-5 py-3.5 text-sm font-medium transition ${
                active
                  ? "border-stone-900 text-stone-900 dark:border-stone-100 dark:text-stone-100"
                  : "border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}