import { X } from "lucide-react";

import type { ProgramResponseDto } from "@/features/programs/types/program.types";

interface ProgramViewModalProps {
  program: ProgramResponseDto | null;
  onClose: () => void;
}

export function ProgramViewModal({
  program,
  onClose,
}: ProgramViewModalProps) {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-stone-950">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 dark:border-stone-800">
          <h2 className="text-lg font-semibold">
            Program Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-stone-100 dark:hover:bg-stone-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Mnemonic
            </p>

            <p className="mt-1 font-medium">
              {program.mnemonic}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Program Name
            </p>

            <p className="mt-1 font-medium">
              {program.name}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Created
            </p>

            <p className="mt-1 font-medium">
              {new Date(
                program.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">
              Course
            </p>

            <p className="mt-1 font-medium">
              Not Added
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}