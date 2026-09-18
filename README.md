# Modern Minimalist MERN Todo App

Full-stack Todo application built with **MongoDB · Express · React (Vite) · Node.js** and **Tailwind CSS**.

Minimal, professional UI with dark mode, search, filters, priorities, due dates, stats and progress.

## Folder structure

```
mern-todo-app/
├── client/                  # React + Vite + Tailwind frontend
│   ├── public/
│   ├── src/
│   │   ├── api/todos.js         # Axios API layer
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── StatsBar.jsx
│   │   │   ├── TodoForm.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
├── server/                  # Express + MongoDB backend
│   ├── config/db.js
│   ├── controllers/todoController.js
│   ├── middleware/errorMiddleware.js
│   ├── models/Todo.js
│   ├── routes/todoRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── package.json             # Root scripts (concurrently)
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

## Quick start

```bash
# 1. Install everything (from project root)
npm run install:all

# 2. Configure backend
cp server/.env.example server/.env
# Edit server/.env and set MONGO_URI

# 3. Run backend + frontend together
npm run dev

# Backend:  http://localhost:5000
# Frontend: http://localhost:5173
```

Run separately if you prefer:

```bash
npm run dev:server   # Express API with nodemon
npm run dev:client   # Vite dev server
```

## Environment variables

`server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_todo
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

`client/.env` (optional):

```
VITE_API_URL=http://localhost:5000/api
```

> If `VITE_API_URL` is not set, Vite proxies `/api` → `http://localhost:5000` in dev.

## API reference

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | /api/health            | Health check             |
| GET    | /api/todos             | List (query: search, status, priority, sort) |
| GET    | /api/todos/stats       | Counts: total/active/completed |
| GET    | /api/todos/:id         | Get one                  |
| POST   | /api/todos             | Create `{title, description?, priority?, dueDate?}` |
| PUT    | /api/todos/:id         | Full update              |
| PATCH  | /api/todos/:id/toggle  | Toggle completed         |
| DELETE | /api/todos/:id         | Delete one               |
| DELETE | /api/todos             | Clear completed          |

## Production build

```bash
npm run build          # builds client/dist
npm start              # serves API + static client
```

Set `NODE_ENV=production` — Express serves `client/dist` automatically.

## Features

- Create / read / update / delete / toggle todos
- Inline edit, optimistic toggle + delete
- Search (debounced), filter All / Active / Done, sort
- Priority (low/med/high) + due date + overdue highlight
- Stats cards + progress bar, clear-completed
- Dark / light mode (persisted), responsive, minimalist design
