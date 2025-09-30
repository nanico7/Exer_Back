import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registarUsuario(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensagem: "Está faltando informação!" });
  }

  if (password.length < 4) {
    return res
      .status(400)
      .json({ mensagem: "A senha deve ter no mínimo 4 caracteres" });
  }

  const novoUser = { username: username, password: password };

  try {
    const criar = await prisma.user.create({
      data: novoUser,
    });
console.log(criar);
    return res.status(201).json(criar);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ mensagem: "Erro ao registrar usuário" });
  }
}

export { registarUsuario };
