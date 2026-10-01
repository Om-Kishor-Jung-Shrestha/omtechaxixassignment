interface CourseBuilderFooterProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function CourseBuilderFooter({
  onCancel,
  onSave,
  isSaving = false,
}: CourseBuilderFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-stone-200 px-6 py-5 dark:border-stone-800">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
      >
        {isSaving
          ? "Saving..."
          : "Save Course"}
      </button>
    </div>
  );
}