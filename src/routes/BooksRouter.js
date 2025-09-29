import { Router } from "express";
import { pegarTodosLivros, pegarLivroId, criarLivro, deletarUser, pegarEmprestado, devolverLivro, atualizarLivro } from "../Controllers/BooksController.js";
import {token as auth} from "../middlewares/auth.js";
import { verificarAdmin } from "../middlewares/adminMiddleware.js";

const roteadorBooks = Router();

roteadorBooks.use(auth)


roteadorBooks.get("/",(req, res) => {
    pegarTodosLivros(req, res)
})

roteadorBooks.get("/:id",  (req, res) => {
    pegarLivroId(req, res)
})

roteadorBooks.post("/", verificarAdmin,(req, res) => {
    criarLivro(req, res)
})

roteadorBooks.delete("/:id", verificarAdmin, (req, res) => {
    deletarUser(req, res)
})

roteadorBooks.post("/:id/return", (req, res) => {
    devolverLivro(req, res)
})

roteadorBooks.post("/:id/borrow", (req, res) => {
    pegarEmprestado(req, res)
})

roteadorBooks.patch("/:id", verificarAdmin, (req, res) => {
    atualizarLivro(req, res)
})

export default roteadorBooks