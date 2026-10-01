import { Plus, Trash2 } from "lucide-react";

interface HighlightsTabProps {
  highlights: string[];
  onChange: (highlights: string[]) => void;
}

export function HighlightsTab({
  highlights,
  onChange,
}: HighlightsTabProps) {
  const canAdd = highlights.length < 5;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          Course Highlights
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Add up to 5 highlights for this course.
        </p>
      </div>

      <div className="space-y-3">
        {highlights.map(
          (highlight, index) => (
            <div
              key={index}
              className="flex gap-2"
            >
              <input
                type="text"
                value={highlight}
                onChange={(event) => {
                  const next = [...highlights];
                  next[index] =
                    event.target.value;
                  onChange(next);
                }}
                placeholder={`Highlight ${index + 1}`}
                className="h-11 flex-1 rounded-lg border border-stone-200 px-3 text-sm dark:border-stone-700 dark:bg-stone-900"
              />

              <button
                type="button"
                onClick={() =>
                  onChange(
                    highlights.filter(
                      (_, itemIndex) =>
                        itemIndex !== index,
                    ),
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:border-red-200 hover:text-red-600 dark:border-stone-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ),
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canAdd}
          onClick={() =>
            onChange([
              ...highlights,
              "",
            ])
          }
          className="inline-flex items-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700"
        >
          <Plus className="h-4 w-4" />
          Add Highlight
        </button>

        <span className="text-sm text-stone-500">
          {highlights.length} / 5 Highlights
        </span>
      </div>
    </section>
  );
}