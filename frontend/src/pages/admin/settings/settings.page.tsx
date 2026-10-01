
import { FolderOpen, Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-100 text-stone-700 dark:bg-stone-900 dark:text-stone-200">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Settings
            </h1>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Manage your application settings and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Storage */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-300">
              <FolderOpen className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                Storage
              </h2>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Configure and monitor application storage.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <div className="p-6">
            {/* Applicant Images */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Applicant Images
              </h3>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Storage Provider
                  </p>

                  <p className="mt-1 text-sm font-medium text-stone-900 dark:text-stone-100">
                    Cloudinary
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Configured
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-stone-200 dark:border-stone-800" />

            {/* Application Documents */}
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Application Documents
              </h3>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Storage Provider
                  </p>

                  <p className="mt-1 text-sm font-medium text-stone-900 dark:text-stone-100">
                    Local Storage
                  </p>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-stone-200 dark:border-stone-800" />

            {/* Local Storage Path */}
            <div>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Local Storage Path
              </p>

              <code className="mt-2 block rounded-lg bg-stone-50 px-4 py-3 text-sm text-stone-700 break-all dark:bg-stone-900 dark:text-stone-300">
                /var/lib/college-admission-management-system/files
              </code>
            </div>

            {/* Test Storage */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Test Storage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
