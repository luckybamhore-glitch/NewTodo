import express from 'express';
import {
  getTodos,
  getStats,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/stats').get(getStats);
router.route('/').get(getTodos).post(createTodo).delete(clearCompleted);
router.route('/:id').get(getTodoById).put(updateTodo).delete(deleteTodo);
router.route('/:id/toggle').patch(toggleTodo);

export default router;
