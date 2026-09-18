export default function StatsBar({ stats }) {
  const items = [
    { label: 'Total', value: stats.total },
    { label: 'Active', value: stats.active },
    { label: 'Done', value: stats.completed },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
        >
          <p className="text-2xl font-semibold tabular-nums tracking-tight">{s.value}</p>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
