import { Router } from "express";
import {
  deleteTodosCtrl,
  editTaskCtrl,
  getAllTodosCtrl,
  postTodosCtrl,
  TodobyIdCtrl,
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/", validarJwt, getAllTodosCtrl);
todosRouter.get("/:id", validarJwt, TodobyIdCtrl);
todosRouter.delete("/:id", validarJwt, deleteTodosCtrl);
todosRouter.put("/:id", validarJwt, editTaskCtrl);
todosRouter.post("/", validarJwt, postTodosCtrl);

export { todosRouter };
