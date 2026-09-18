import { ListTodo } from 'lucide-react';

export default function EmptyState({ status, onReset }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 px-6 py-14 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
        <ListTodo size={22} />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold">No tasks found</h3>
      <p className="mt-1 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
        {status === 'all'
          ? 'You’re all clear. Add your first task above to get started.'
          : status === 'active'
            ? 'Nothing active right now. Enjoy the calm — or add something new.'
            : 'No completed tasks yet. Finish one and it will show up here.'}
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-xl border border-neutral-200 px-4 py-2 text-[13px] font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
      >
        Show all tasks
      </button>
    </div>
  );
}
