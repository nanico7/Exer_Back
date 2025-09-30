import { Router } from "express";
import {
  pegarTodosLivros,
  pegarLivroId,
  criarLivro,
  deletarUser,
  pegarEmprestado,
  devolverLivro,
  atualizarLivro
} from "../../../Controllers/BooksController.js";
import { token as auth } from "../../../middlewares/auth.js";
import { verificarAdmin } from "../../../middlewares/adminMiddleware.js";

const roteadorBooks = Router();


roteadorBooks.use(auth);


roteadorBooks.get("/", pegarTodosLivros);
roteadorBooks.get("/:id", pegarLivroId);

roteadorBooks.post("/", verificarAdmin, criarLivro);
roteadorBooks.delete("/:id", verificarAdmin, deletarUser);
roteadorBooks.patch("/:id", verificarAdmin, atualizarLivro);

roteadorBooks.post("/:id/borrow", pegarEmprestado);
roteadorBooks.post("/:id/return", devolverLivro);

export default roteadorBooks;
