import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
});

export const fetchTodos = async (params = {}) => {
  const { data } = await api.get('/todos', { params });
  return data.data;
};

export const fetchStats = async () => {
  const { data } = await api.get('/todos/stats');
  return data.data;
};

export const createTodo = async (payload) => {
  const { data } = await api.post('/todos', payload);
  return data.data;
};

export const updateTodo = async (id, payload) => {
  const { data } = await api.put(`/todos/${id}`, payload);
  return data.data;
};

export const toggleTodo = async (id) => {
  const { data } = await api.patch(`/todos/${id}/toggle`);
  return data.data;
};

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};

export const clearCompleted = async () => {
  const { data } = await api.delete('/todos');
  return data;
};

export default api;
