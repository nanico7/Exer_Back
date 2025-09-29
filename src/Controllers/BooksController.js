import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

async function pegarTodosLivros(req, res) {

    const pegar = await prisma.livros.findMany()

    return res.status(200).json(pegar)
}

async function pegarLivroId(req, res) {

    const id = parseInt(req.params.id)

    if (isNaN(id)) {
        return Error(res
            .status(400)
            .json({ mensagem: "ID inválido, precisa ser um numero" }));
        }
        
    try{
    const pegar = await prisma.livros.findUnique({
        where: {
            id: id 
        }
    })

    if(!pegar) {
        throw new Error(res.status(400).json({mensagem: "Este livro não existe"}))
    }
    return res.status(200).json(pegar)
} catch(err) {
    return console.log(err)
}
}

async function criarLivro(req, res) {

    const {title , author} = req.body;

    if(!title || !author) {
        throw new Error(res.status(400).json({mensagem: "Está faltando informação!"}))
    }

    let novoLivro = {
        title: title,
        author: author
    }

    try{

        
    let criar = await prisma.livros.create({
        data: novoLivro
    })
    return res.status(201).json(criar)

    } catch( err) {
        res.status(400).send(err)
        console.log(err)
    }
}

async function atualizarLivro(req, res) {

    const id = parseInt(req.params.id)
    
    if (isNaN(id)) {
        return Error(res
            .status(400)
            .json({ mensagem: "ID inválido, precisa ser um numero" }));
    }

    const {title, author, available} = req.body 

    if(!title || !author) {
        throw new Error(res.status(400).json({mensagem: "Esta faltando informação!"}))
    }

    try{

    const verify = await prisma.livros.findUnique( {
        where: {
            id: id
        }
    })

    if(!verify) {
        throw new Error(res.status(400).json({mensagem: "Este livro não existe!"}))
    } 

    const atualizar = await prisma.livros.update({
        where: {
            id: id 
        },
        data: {
            author: author,
            title: title,
            available: available
        }
    })

    return res.status(202).json(atualizar)
    } catch(err) {
        console.log(err)
    } 
}

async function deletarUser(req, res) {

    const id = parseInt(req.params.id)

    if(isNaN(id) || !id) {
        throw new Error(res.status(400).json({mensagem: "O ID do livro está incorreto!"}))
    }

    try{

    const verify = await prisma.livros.findUnique( {
        where: {
            id: id
        }
    })

    if(!verify) {
        throw new Error(res.status(400).json({mensagem: "Este livro não existe!"}))
    } 

    const deletar = await prisma.livros.delete({
        where: {
            id: id
        }
    })

    return res.status(200).json(deletar)

    } catch(err) {
        console.log(err)
    }
}

async function pegarEmprestado(req, res) {
    const id = parseInt(req.params.id)

    if(isNaN(id) || !id) {
        throw new Error(res.status(400).json({mensagem: "O ID do livro está incorreto!"}))
    }

    try {

    const verify = await prisma.livros.findUnique( {
        where: {
            id: id
        }
    })

    if(!verify) {
        throw new Error(res.status(400).json({mensagem: "Este livro não existe!"}))
    }    

    if(verify.available === false) {
        throw new Error(res.status(400).json({mensagem: "Este livro já esta com alguem!"}))
    }

    const emprestar = await prisma.livros.update( {
        where: {
            id: id
        },
        data: {
            available: false
        } 
    })

   

    return res.status(200).json(emprestar)
} catch (err) {
    console.log(err)
}
}

async function devolverLivro(req, res) {
    const id = parseInt(req.params.id)

    if(isNaN(id) || !id) {
        throw new Error(res.status(400).json({mensagem: "O ID do livro está incorreto!"}))
    }

    try {

    const verify = await prisma.livros.findUnique( {
        where: {
            id: id
        }
    })

    if(!verify) {
        throw new Error(res.status(400).json({mensagem: "Este livro não existe!"}))
    }    

    if(verify.available === true) {
        throw new Error(res.status(400).json({mensagem: "Este livro já esta na plateleira!"}))
    }  

    const devolver = await prisma.livros.update( {
        where: {
            id: id
        },
        data: {
            available: true 
        } 
    })

    return res.status(200).json(devolver)
    } catch(e) {
        console.log(e)
    }
}

export {pegarTodosLivros, pegarLivroId, criarLivro, deletarUser, pegarEmprestado, devolverLivro, atualizarLivro};