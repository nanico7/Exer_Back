import express from "express";
import roteadorUser from "./routes/UserRouter.js";
import roteadorBooks from "./routes/BooksRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas
app.use("/auth", roteadorUser);
app.use("/books", roteadorBooks);
app.l
