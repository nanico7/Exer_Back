import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function pegarTodosLivros(req, res) {
    try {
        const livros = await prisma.livros.findMany();
        res.status(200).json(livros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
}

async function pegarLivroId(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um número" });
    }

    try {
        const livro = await prisma.livros.findUnique({ where: { id } });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe" });
        }

        res.status(200).json(livro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
}

async function criarLivro(req, res) {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ mensagem: "Está faltando informação!" });
    }

    try {
        const novoLivro = await prisma.livros.create({
            data: { title, author }
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao criar livro" });
    }
}

async function atualizarLivro(req, res) {
    const id = parseInt(req.params.id);
    const { title, author, available } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um número" });
    }

    if (!title || !author) {
        return res.status(400).json({ mensagem: "Está faltando informação!" });
    }

    try {
        const livro = await prisma.livros.findUnique({ where: { id } });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe!" });
        }

        const atualizado = await prisma.livros.update({
            where: { id },
            data: { title, author, available }
        });

        res.status(202).json(atualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao atualizar livro" });
    }
}

async function deletarUser(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "O ID do livro está incorreto!" });
    }

    try {
        const livro = await prisma.livros.findUnique({ where: { id } });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe!" });
        }

        await prisma.livros.delete({ where: { id } });

        res.status(200).json({ mensagem: "Livro deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao deletar livro" });
    }
}

async function pegarEmprestado(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "O ID do livro está incorreto!" });
    }

    try {
        const livro = await prisma.livros.findUnique({ where: { id } });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe!" });
        }

        if (!livro.available) {
            return res.status(400).json({ mensagem: "Este livro já está com alguém!" });
        }

        const emprestado = await prisma.livros.update({
            where: { id },
            data: { available: false }
        });

        res.status(200).json(emprestado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao emprestar livro" });
    }
}

async function devolverLivro(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "O ID do livro está incorreto!" });
    }

    try {
        const livro = await prisma.livros.findUnique({ where: { id } });

        if (!livro) {
            return res.status(404).json({ mensagem: "Este livro não existe!" });
        }

        if (livro.available) {
            return res.status(400).json({ mensagem: "Este livro já está na prateleira!" });
        }

        const devolvido = await prisma.livros.update({
            where: { id },
            data: { available: true }
        });

        res.status(200).json(devolvido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao devolver livro" });
    }
}

export {
    pegarTodosLivros,
    pegarLivroId,
    criarLivro,
    atualizarLivro,
    deletarUser,
    pegarEmprestado,
    devolverLivro
};
