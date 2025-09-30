import express from "express";
import roteadorUser from "./routes/Users/Routers/UserRouter.js";
import roteadorBooks from "./routes/Users/Routers/BooksRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", roteadorUser);
app.use("/books", roteadorBooks);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

