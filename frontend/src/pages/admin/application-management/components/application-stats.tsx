interface ApplicationStatsProps {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  isLoading?: boolean;
}

interface StatCardProps {
  label: string;
  value: number;
  isLoading?: boolean;
}

function StatCard({
  label,
  value,
  isLoading = false,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
        {label}
      </p>

      {isLoading ? (
        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-stone-200 dark:bg-stone-700" />
      ) : (
        <p className="mt-2 text-2xl font-semibold text-stone-900 dark:text-stone-100">
          {value.toLocaleString()}
        </p>
      )}
    </div>
  );
}

export function ApplicationStats({
  total,
  pending,
  underReview,
  approved,
  isLoading,
}: ApplicationStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Applications"
        value={total}
        isLoading={isLoading}
      />

      <StatCard
        label="Pending"
        value={pending}
        isLoading={isLoading}
      />

      <StatCard
        label="Under Review"
        value={underReview}
        isLoading={isLoading}
      />

      <StatCard
        label="Approved"
        value={approved}
        isLoading={isLoading}
      />
    </div>
  );
}