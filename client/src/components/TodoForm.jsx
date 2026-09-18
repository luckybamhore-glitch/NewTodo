import { useState } from 'react';
import { Plus } from 'lucide-react';

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Med' },
  { value: 'high', label: 'High' },
];

export default function TodoForm({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim() || loading) return;
    await onAdd({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
    });
    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task… e.g. Review PR before standup"
          className="h-11 w-full rounded-xl bg-transparent px-3 text-[15px] outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
          maxLength={200}
        />
        <button
          type="submit"
          disabled={!title.trim() || loading}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          <Plus size={17} />
          <span className="hidden sm:inline">{loading ? 'Adding…' : 'Add'}</span>
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
        <div className="flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                priority === p.value
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-8 rounded-lg border border-neutral-200 bg-transparent px-2 text-xs text-neutral-600 outline-none dark:border-neutral-700 dark:text-neutral-300"
        />
        <span className="ml-auto hidden text-xs text-neutral-400 md:inline">
          Press Enter to add
        </span>
      </div>
    </form>
  );
}
