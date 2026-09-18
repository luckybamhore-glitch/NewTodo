import { useState } from 'react';
import { Trash2, Pencil, Check, X, CalendarDays } from 'lucide-react';

const priorityStyles = {
  low: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  high: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
};

function formatDate(d) {
  if (!d) return null;
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  const save = () => {
    if (draft.trim() && draft.trim() !== todo.title) {
      onUpdate(todo._id, { title: draft.trim() });
    } else {
      setDraft(todo.title);
    }
    setEditing(false);
  };

  const isOverdue =
    todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());

  return (
    <div
      className={`animate-fade-up group flex items-start gap-3 rounded-2xl border bg-white p-3.5 shadow-card transition dark:bg-neutral-900 ${
        todo.completed
          ? 'border-neutral-100 opacity-70 dark:border-neutral-800/60'
          : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
      }`}
    >
      <button
        onClick={() => onToggle(todo._id)}
        aria-label={todo.completed ? 'Mark active' : 'Mark complete'}
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
            : 'border-neutral-300 hover:border-neutral-900 dark:border-neutral-600 dark:hover:border-white'
        }`}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') {
                  setDraft(todo.title);
                  setEditing(false);
                }
              }}
              maxLength={200}
              className="h-9 w-full rounded-lg border border-neutral-300 bg-white px-2.5 text-sm outline-none dark:border-neutral-600 dark:bg-neutral-950"
            />
            <button
              onClick={save}
              className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {
                setDraft(todo.title);
                setEditing(false);
              }}
              className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 dark:border-neutral-700"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <>
            <p
              className={`truncate text-[15px] font-medium leading-snug ${
                todo.completed
                  ? 'text-neutral-400 line-through dark:text-neutral-500'
                  : 'text-neutral-900 dark:text-neutral-100'
              }`}
            >
              {todo.title}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${priorityStyles[todo.priority] || priorityStyles.medium}`}
              >
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span
                  className={`inline-flex items-center gap-1 text-xs ${
                    isOverdue
                      ? 'font-medium text-rose-600 dark:text-rose-400'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  <CalendarDays size={13} />
                  {formatDate(todo.dueDate)}
                  {isOverdue ? ' · overdue' : ''}
                </span>
              )}
              <span className="text-[11px] text-neutral-400">
                {new Date(todo.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </>
        )}
      </div>

      {!editing && (
        <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={() => setEditing(true)}
            aria-label="Edit"
            className="grid h-8 w-8 place-items-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            aria-label="Delete"
            className="grid h-8 w-8 place-items-center rounded-lg text-neutral-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
