import { Search } from "lucide-react";

interface ProgramsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProgramsSearch({
  value,
  onChange,
}: ProgramsSearchProps) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

        <input
          type="search"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder="Search programs..."
          className="h-11 w-full rounded-lg border border-stone-200 bg-stone-50 pl-10 pr-4 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-400 focus:bg-white dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
        />
      </div>
    </section>
  );
}