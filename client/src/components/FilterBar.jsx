import { Search, ArrowUpDown } from 'lucide-react';

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Done' },
];

export default function FilterBar({
  status,
  setStatus,
  search,
  setSearch,
  sort,
  setSort,
  onClearCompleted,
  completedCount,
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-3 shadow-card dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm outline-none transition focus:border-neutral-400 focus:bg-white dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600 dark:focus:bg-neutral-900"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setStatus(t.value)}
                className={`rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition ${
                  status === t.value
                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <ArrowUpDown
              size={14}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 appearance-none rounded-xl border border-neutral-200 bg-transparent pl-8 pr-3 text-[13px] font-medium outline-none dark:border-neutral-700"
            >
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="dueDate">Due date</option>
              <option value="title">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {completedCount > 0 && (
        <div className="flex items-center justify-between border-t border-neutral-100 pt-2.5 text-[13px] dark:border-neutral-800">
          <span className="text-neutral-500 dark:text-neutral-400">
            {completedCount} completed
          </span>
          <button
            onClick={onClearCompleted}
            className="font-medium text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}
