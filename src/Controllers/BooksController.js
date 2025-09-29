import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função genérica para tratamento de erros
const tratarErro = (res, status = 400, mensagem = "Erro desconhecido") => {
  return res.status(status).json({ mensagem });
};

async function pegarTodosLivros(req, res) {
  try {
    const livros = await prisma.livros.findMany();
    return res.status(200).json(livros);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao buscar livros");
  }
}

async function pegarLivroId(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return tratarErro(res, 400, "ID inválido, precisa ser um número");

  try {
    const livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) return tratarErro(res, 404, "Este livro não existe");
    return res.status(200).json(livro);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao buscar livro");
  }
}

async function criarLivro(req, res) {
  const { title, author } = req.body;
  if (!title || !author) return tratarErro(res, 400, "Está faltando informação!");

  try {
    const novoLivro = await prisma.livros.create({
      data: { title, author },
    });
    return res.status(201).json(novoLivro);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao criar livro");
  }
}

async function atualizarLivro(req, res) {
  const id = parseInt(req.params.id);
  const { title, author, available } = req.body;

  if (isNaN(id)) return tratarErro(res, 400, "ID inválido, precisa ser um número");
  if (!title || !author) return tratarErro(res, 400, "Está faltando informação!");

  try {
    const livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) return tratarErro(res, 404, "Este livro não existe");

    const atualizado = await prisma.livros.update({
      where: { id },
      data: { title, author, available },
    });

    return res.status(202).json(atualizado);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao atualizar livro");
  }
}

async function deletarUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return tratarErro(res, 400, "O ID do livro está incorreto!");

  try {
    const livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) return tratarErro(res, 404, "Este livro não existe");

    const deletado = await prisma.livros.delete({ where: { id } });
    return res.status(200).json(deletado);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao deletar livro");
  }
}

async function pegarEmprestado(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return tratarErro(res, 400, "O ID do livro está incorreto!");

  try {
    const livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) return tratarErro(res, 404, "Este livro não existe");
    if (!livro.available) return tratarErro(res, 400, "Este livro já está com alguém!");

    const emprestado = await prisma.livros.update({
      where: { id },
      data: { available: false },
    });

    return res.status(200).json(emprestado);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao emprestar livro");
  }
}

async function devolverLivro(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return tratarErro(res, 400, "O ID do livro está incorreto!");

  try {
    const livro = await prisma.livros.findUnique({ where: { id } });
    if (!livro) return tratarErro(res, 404, "Este livro não existe");
    if (livro.available) return tratarErro(res, 400, "Este livro já está na prateleira!");

    const devolvido = await prisma.livros.update({
      where: { id },
      data: { available: true },
    });

    return res.status(200).json(devolvido);
  } catch (err) {
    console.log(err);
    return tratarErro(res, 500, "Erro ao devolver livro");
  }
}

export {
  pegarTodosLivros,
  pegarLivroId,
  criarLivro,
  deletarUser,
  pegarEmprestado,
  devolverLivro,
  atualizarLivro,
};
