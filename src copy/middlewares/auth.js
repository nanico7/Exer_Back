import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function token(req, res, next) {
    try {
        const auth = req.headers.authorization;

        if (!auth || !auth.startsWith("Basic ")) {
            return res.status(400).json({ mensagem: "Token precisa ser Basic" });
        }

        const conteudoToken = auth.split(" ")[1];
        const tokenDecoded = Buffer.from(conteudoToken, "base64").toString();
        const [username, password] = tokenDecoded.split(":");

        const usuario = await prisma.user.findUnique({ where: { username } });

        if (!usuario) {
            return res.status(401).json({ mensagem: "Usuário não encontrado" });
        }

        if (!password || usuario.password !== password) {
            return res.status(401).json({ mensagem: "A senha está incorreta!" });
        }

        req.user = usuario;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
}
