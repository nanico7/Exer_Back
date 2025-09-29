import { Router } from "express";
import { registarUsuario } from "../Controllers/UserController.js";

const roteadorUser = Router();

roteadorUser.post("/register", (req, res) => {
    registarUsuario(req, res)
})

export default roteadorUser;