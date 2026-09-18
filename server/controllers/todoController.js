import asyncHandler from 'express-async-handler';
import Todo from '../models/Todo.js';

// @desc    Get all todos with search / filter / sort
// @route   GET /api/todos
export const getTodos = asyncHandler(async (req, res) => {
  const { search = '', status = 'all', priority = 'all', sort = '-createdAt' } = req.query;

  const filter = {};
  if (status === 'active') filter.completed = false;
  if (status === 'completed') filter.completed = true;
  if (['low', 'medium', 'high'].includes(priority)) filter.priority = priority;
  if (search.trim()) {
    filter.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
    ];
  }

  // Allowlist sort fields to prevent NoSQL injection via sort
  const allowedSorts = new Set([
    'createdAt', '-createdAt',
    'updatedAt', '-updatedAt',
    'dueDate', '-dueDate',
    'priority', '-priority',
    'title', '-title',
  ]);
  const sortOption = allowedSorts.has(sort) ? sort : '-createdAt';

  const todos = await Todo.find(filter).sort(sortOption);
  res.json({ success: true, count: todos.length, data: todos });
});

// @desc    Get stats
// @route   GET /api/todos/stats
export const getStats = asyncHandler(async (req, res) => {
  const [total, completed] = await Promise.all([
    Todo.countDocuments(),
    Todo.countDocuments({ completed: true }),
  ]);
  res.json({
    success: true,
    data: { total, completed, active: total - completed },
  });
});

// @desc    Get single todo
// @route   GET /api/todos/:id
export const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  res.json({ success: true, data: todo });
});

// @desc    Create todo
// @route   POST /api/todos
export const createTodo = asyncHandler(async (req, res) => {
  const { title, description = '', priority = 'medium', dueDate = null } = req.body;
  if (!title || !title.trim()) {
    res.status(400);
    throw new Error('Title is required');
  }
  const todo = await Todo.create({
    title: title.trim(),
    description: description.trim(),
    priority,
    dueDate: dueDate || null,
  });
  res.status(201).json({ success: true, data: todo });
});

// @desc    Update todo
// @route   PUT /api/todos/:id
export const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, completed, priority, dueDate } = req.body;
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  if (title !== undefined) {
    if (!title.trim()) {
      res.status(400);
      throw new Error('Title cannot be empty');
    }
    todo.title = title.trim();
  }
  if (description !== undefined) todo.description = description.trim();
  if (completed !== undefined) todo.completed = Boolean(completed);
  if (priority !== undefined) todo.priority = priority;
  if (dueDate !== undefined) todo.dueDate = dueDate || null;

  const updated = await todo.save();
  res.json({ success: true, data: updated });
});

// @desc    Toggle completed
// @route   PATCH /api/todos/:id/toggle
export const toggleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ success: true, data: todo });
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  await todo.deleteOne();
  res.json({ success: true, message: 'Todo deleted' });
});

// @desc    Clear completed
// @route   DELETE /api/todos
export const clearCompleted = asyncHandler(async (req, res) => {
  const result = await Todo.deleteMany({ completed: true });
  res.json({ success: true, deletedCount: result.deletedCount });
});
