export async function verificarAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({ mensagem: "Usuário não autenticado" });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ mensagem: "Usuário não tem permissão de admin" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
}
