import { Router } from "express";
import { registrarUsuario } from "../Controllers/Controller.js";

const roteadorUser = Router();

roteadorUser.post("/", registrarUsuario);

export default roteadorUser;
