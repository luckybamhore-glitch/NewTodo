import { Moon, Sun, CheckCheck } from 'lucide-react';

export default function Header({ dark, onToggleDark, progress }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neutral-900 text-white shadow-card dark:bg-white dark:text-neutral-900">
          <CheckCheck size={22} strokeWidth={2.2} />
        </div>
        <div>
          <h1 className="text-xl font-semibold leading-tight tracking-tight">Tasks</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Minimal, fast & focused.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block w-36">
          <div className="mb-1 flex justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className="h-full rounded-full bg-neutral-900 transition-all dark:bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={onToggleDark}
          aria-label="Toggle theme"
          className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-600 shadow-card transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
