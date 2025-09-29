import express from "express";
import roteadorUser from "./routes/Users/Routers/Router.js";
import roteadorBooks from "./routes/Books/Routers/Router.js";

const api = express();
const PORT = 3000;

api.use(express.json());

api.use("/users", roteadorUser);
api.use("/books", roteadorBooks);

api.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
