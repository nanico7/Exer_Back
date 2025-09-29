import { Router } from "express";
import {
    pegarTodosLivros,
    pegarLivroId,
    criarLivro,
    deletarUser,
    pegarEmprestado,
    devolverLivro,
    atualizarLivro
} from "../Controllers/Controller.js";
import { token as auth } from "../../../middlewares/auth.js";
import { verificarAdmin } from "../../../middlewares/adminMiddleware.js";

const roteadorBooks = Router();

roteadorBooks.use(auth);

roteadorBooks.get("/", pegarTodosLivros);
roteadorBooks.get("/:id", pegarLivroId);
roteadorBooks.post("/:id/return", devolverLivro);
roteadorBooks.post("/:id/borrow", pegarEmprestado);

roteadorBooks.post("/", verificarAdmin, criarLivro);
roteadorBooks.patch("/:id", verificarAdmin, atualizarLivro);
roteadorBooks.delete("/:id", verificarAdmin, deletarUser);

export default roteadorBooks;
