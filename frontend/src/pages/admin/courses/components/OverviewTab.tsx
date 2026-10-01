import { Plus, Trash2 } from "lucide-react";

import type { CourseOverviewDto } from "@/features/programs/types/course.types";

interface OverviewTabProps {
  overview: CourseOverviewDto;
  onChange: (overview: CourseOverviewDto) => void;
}

export function OverviewTab({
  overview,
  onChange,
}: OverviewTabProps) {
  function updateObjective(
    index: number,
    value: string,
  ) {
    const objectives = [...overview.objectives];
    objectives[index] = value;

    onChange({
      ...overview,
      objectives,
    });
  }

  function updateCareer(
    index: number,
    value: string,
  ) {
    const careerOpportunities = [
      ...overview.careerOpportunities,
    ];

    careerOpportunities[index] = value;

    onChange({
      ...overview,
      careerOpportunities,
    });
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          Course Overview
        </h2>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Course Introduction
        </label>

        <textarea
          rows={6}
          value={overview.introduction}
          onChange={(event) =>
            onChange({
              ...overview,
              introduction: event.target.value,
            })
          }
          placeholder="Introduce the course..."
          className="w-full resize-y rounded-lg border border-stone-200 px-3 py-3 text-sm outline-none focus:border-stone-400 dark:border-stone-700 dark:bg-stone-900"
        />
      </div>

      <ListEditor
        title="Objectives"
        items={overview.objectives}
        placeholder="Course objective"
        onChange={updateObjective}
        onAdd={() =>
          onChange({
            ...overview,
            objectives: [
              ...overview.objectives,
              "",
            ],
          })
        }
        onRemove={(index) =>
          onChange({
            ...overview,
            objectives:
              overview.objectives.filter(
                (_, itemIndex) =>
                  itemIndex !== index,
              ),
          })
        }
      />

      <ListEditor
        title="Career Opportunities"
        items={overview.careerOpportunities}
        placeholder="Career opportunity"
        onChange={updateCareer}
        onAdd={() =>
          onChange({
            ...overview,
            careerOpportunities: [
              ...overview.careerOpportunities,
              "",
            ],
          })
        }
        onRemove={(index) =>
          onChange({
            ...overview,
            careerOpportunities:
              overview.careerOpportunities.filter(
                (_, itemIndex) =>
                  itemIndex !== index,
              ),
          })
        }
      />
    </section>
  );
}

interface ListEditorProps {
  title: string;
  items: string[];
  placeholder: string;
  onChange: (
    index: number,
    value: string,
  ) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function ListEditor({
  title,
  items,
  placeholder,
  onChange,
  onAdd,
  onRemove,
}: ListEditorProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">
        {title}
      </h3>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <input
              type="text"
              value={item}
              onChange={(event) =>
                onChange(
                  index,
                  event.target.value,
                )
              }
              placeholder={placeholder}
              className="h-11 flex-1 rounded-lg border border-stone-200 px-3 text-sm dark:border-stone-700 dark:bg-stone-900"
            />

            <button
              type="button"
              onClick={() =>
                onRemove(index)
              }
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:border-red-200 hover:text-red-600 dark:border-stone-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
      >
        <Plus className="h-4 w-4" />
        Add {title === "Objectives"
          ? "Objective"
          : "Career Opportunity"}
      </button>
    </div>
  );
}