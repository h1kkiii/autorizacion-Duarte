import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  const todos = database.todos.filter((todo) => todo.owner === req.user.id);

  res.json({ todos });
};

export const deleteTodosCtrl = (req, res) => {
  const id = req.user.id;

  const deleteTodo = database.todos.findIndex((todo) => todo.id === id);

  if (deleteTodo === -1) {
    return res.status(404).json({ message: "No se encontró el id" });
  } else {
    database.todos.splice(deleteTodo, 1);
    return res.json({ message: "Todo eliminado" }).status(200);
  }
};

export const TodobyIdCtrl = (req, res) => {
  const id = parseInt(req.params.id);

  const userId = database.todos.find((user) => user.id === id);

  if (!userId) {
    return res.status(404).json({ message: "No se encontró el id" });
  } else {
    return res.json({ userId });
  }
};

export const editTaskCtrl = (req, res) => {
  const { title, completed } = req.body;
  const isCompleteValue = completed === true || completed === "true" ? 1 : 0;

  // Buscar el índice de la tarea que se desea editar
  const todoIndex = database.todos.findIndex(
    (todo) => todo.id === parseInt(req.params.id, 10)
  );

  if (todoIndex === -1) {
    // Si no se encuentra la tarea, devolver un error 404
    return res.status(404).json({ msg: "Tarea no encontrada" });
  } else {
    // Actualizar la tarea en el índice encontrado
    database.todos[todoIndex].title = title;
    database.todos[todoIndex].completed = isCompleteValue;

    // Devolver una respuesta exitosa
    return res.json({
      msg: "Tarea actualizada correctamente",
      todo: database.todos[todoIndex],
    });
  }
};

export const postTodosCtrl = (req, res) => {
  const { title, completed } = req.body;
  const newTodo = {
    id: database.todos.length + 1, // Asumiendo que el ID es secuencial
    title,
    completed,
    owner: req.user.id, // Asumiendo que tienes la ID del usuario desde el JWT
  };

  database.todos.push(newTodo);
  res.status(201).json({ todo: newTodo });
};
