import { Router } from "express";
import { registarUsuario } from "../../../Controllers/UserController.js";

const roteadorUser = Router();

roteadorUser.post("/register", registarUsuario);

export default roteadorUser;
