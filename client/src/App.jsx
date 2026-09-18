import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoItem from './components/TodoItem';
import StatsBar from './components/StatsBar';
import EmptyState from './components/EmptyState';
import {
  fetchTodos,
  fetchStats,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
} from './api/todos';

function useDarkMode() {
  const [dark, setDark] = useState(
    () => localStorage.getItem('tasks-theme') === 'dark'
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('tasks-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
}

export default function App() {
  const [dark, toggleDark] = useDarkMode();
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-createdAt');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const [list, s] = await Promise.all([
        fetchTodos({ status, search: debouncedSearch, sort }),
        fetchStats(),
      ]);
      setTodos(list);
      setStats(s);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          'Could not reach the API. Is the server running on :5000?'
      );
    } finally {
      setLoading(false);
    }
  }, [status, debouncedSearch, sort]);

  useEffect(() => {
    load();
  }, [load]);

  const refreshStats = async () => {
    try {
      setStats(await fetchStats());
    } catch {
      /* ignore */
    }
  };

  const handleAdd = async (payload) => {
    try {
      setAdding(true);
      const created = await createTodo(payload);
      // Prepend if current filter would include it
      setTodos((prev) => [created, ...prev]);
      refreshStats();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to add task');
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id) => {
    // optimistic
    setTodos((prev) =>
      prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const updated = await toggleTodo(id);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
      refreshStats();
    } catch {
      load();
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await updateTodo(id, payload);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      await deleteTodo(id);
      refreshStats();
    } catch {
      load();
    }
  };

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
      setTodos((prev) => prev.filter((t) => !t.completed));
      refreshStats();
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to clear completed');
    }
  };

  const progress = useMemo(() => {
    if (!stats.total) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-8 sm:pt-12">
        <Header dark={dark} onToggleDark={toggleDark} progress={progress} />

        <main className="mt-6 space-y-4">
          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
              <button
                onClick={() => setError('')}
                className="ml-3 font-semibold underline-offset-4 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <StatsBar stats={stats} />
          <TodoForm onAdd={handleAdd} loading={adding} />
          <FilterBar
            status={status}
            setStatus={setStatus}
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            onClearCompleted={handleClearCompleted}
            completedCount={stats.completed}
          />

          <section className="space-y-2.5">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[72px] animate-pulse rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                />
              ))
            ) : todos.length === 0 ? (
              <EmptyState
                status={status}
                onReset={() => {
                  setStatus('all');
                  setSearch('');
                }}
              />
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            )}
          </section>

          <footer className="pt-4 text-center text-xs text-neutral-400 dark:text-neutral-500">
            MERN + Tailwind · Minimal Todo · {stats.active} active · {stats.completed} done
          </footer>
        </main>
      </div>
    </div>
  );
}
