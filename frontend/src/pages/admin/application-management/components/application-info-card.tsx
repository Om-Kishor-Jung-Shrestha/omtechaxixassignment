interface ApplicationInfoItem {
  label: string;
  value?: string | null;
}

interface ApplicationInfoCardProps {
  title: string;
  items: ApplicationInfoItem[];
}

export function ApplicationInfoCard({
  title,
  items,
}: ApplicationInfoCardProps) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {item.label}
            </p>

            <p className="mt-1 text-sm text-stone-900 dark:text-stone-100">
              {item.value || "—"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}