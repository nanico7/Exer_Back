import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registrarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensagem: "Está faltando informação!" });
    }

    try {
        const novoUser = await prisma.user.create({
            data: { username, password }
        });

        res.status(201).json(novoUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao registrar usuário" });
    }
}

export { registrarUsuario };
