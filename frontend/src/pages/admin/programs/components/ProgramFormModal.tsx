// import type {
//   FormEvent,
// } from "react";

import { X } from "lucide-react";

import type {
  CreateProgramDto,
  ProgramResponseDto,
} from "@/features/programs/types/program.types";

// interface ProgramFormModalProps {
//   open: boolean;
//   editingProgram: ProgramResponseDto | null;
//   form: CreateProgramDto;
//   isSaving: boolean;

//   onChange: React.Dispatch<
//     React.SetStateAction<CreateProgramDto>
//   >;

//   onSubmit: (
//     event: React.FormEvent<HTMLFormElement>
//   ) => void;

//   onClose: () => void;
// }
interface ProgramFormModalProps {
  open: boolean;
  editingProgram: ProgramResponseDto | null;
  form: CreateProgramDto;
  isSaving: boolean;

  onChange: React.Dispatch<
    React.SetStateAction<CreateProgramDto>
  >;

  onSubmit: NonNullable<
    React.ComponentProps<"form">["onSubmit"]
  >;

  onClose: () => void;
}

export function ProgramFormModal({
  open,
  editingProgram,
  form,
  isSaving,
  onChange,
  onSubmit,
  onClose,
}: ProgramFormModalProps) {
  if (!open) return null;

  const isEditing = Boolean(editingProgram);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-stone-950">

        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-800">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {isEditing
              ? "Edit Program"
              : "Add Program"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="rounded-lg p-2 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Program Mnemonic
            </label>

            <input
              value={form.mnemonic}
              maxLength={20}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  mnemonic: event.target.value,
                }))
              }
              placeholder="BCA"
              required
              className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm outline-none focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
            />

            <p className="mt-1 text-xs text-stone-500">
              Maximum 20 characters.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Program Name
            </label>

            <input
              value={form.name}
              maxLength={150}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="Bachelor of Computer Applications"
              required
              className="h-11 w-full rounded-lg border border-stone-300 px-3 text-sm outline-none focus:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
            />

            <p className="mt-1 text-xs text-stone-500">
              2–150 characters.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium dark:border-stone-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
            >
              {isSaving
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Save Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}