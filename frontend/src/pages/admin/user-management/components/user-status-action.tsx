
import { Loader2, Power } from "lucide-react";

import type { UserStatus } from "@/types/user.types";

interface UserStatusActionProps {
  status: UserStatus;
  isLoading?: boolean;
  disabled?: boolean;
  onChange: (status: UserStatus) => void;
}

export function UserStatusAction({
  status,
  isLoading = false,
  disabled = false,
  onChange,
}: UserStatusActionProps) {
  const isActive = status === "active";

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      onClick={() =>
        onChange(isActive ? "deactivated" : "active")
      }
      className={[
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isActive
          ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
          : "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30",
      ].join(" ")}
      title={isActive ? "Deactivate user" : "Activate user"}
    >
      {isLoading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Power className="h-3.5 w-3.5" />
      )}

      {isLoading
        ? "Updating..."
        : isActive
          ? "Deactivate"
          : "Activate"}
    </button>
  );
}
