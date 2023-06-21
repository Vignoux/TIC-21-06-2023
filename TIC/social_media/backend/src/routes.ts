//importa classe Fastify da dependencia fastify baixada anteriormente
import { FastifyInstance } from "fastify"
//no arquivo package.json ta rodando o script q atualiza tumatico
//instanciar um objeto da classe Fastify
//importa a dependencia zod

import {z} from 'zod'

import { prisma } from "./lib/prisma"

export async function AppRoutes(server:FastifyInstance){
    //criar uma rota de API com o verbo GET - consulta

    //rota ára çostar ( consultar ) os posts cadastrados no banco de dados
    //a funcao é assincrona, insto é, quem a chamar, pode continuar sem que tenha resposta
    server.get('/posts', async()=> {
        //await (aguarde) indica que a função somente continua depois que os dados vieram do BD
        const posts = await prisma.post.findMany()
        return posts
    })

    server.get('/posts/title/:title'/*variavel esse : title,permite que troque o starts with*/,async(request)=>{
        //defione um objeto zod contendo o esquema de daos
        const titleParam = z.object({
            title: z.string()
        })

        //recupera o dado do frontend a partir do zod titleParam
        //converte o texto enviado pelo frontend para a variavel title
        const {title} = titleParam.parse(request.params)   //request.params = > recupera dado presente na URL

        return await prisma.post.findMany({
            where:{
                title:{
                    startsWith: title
                }
            }
        })
    })

    //rota para criação de um post, adição de  um post no banco - verbo post 
    server.post('/post', async(request)=>{
        // define um objeto zod contendo o esquema de dados
        const postBody = z.object({
            title: z.string(),
            content: z.string(),
            published: z.boolean(),
            userId: z.number()
        })
        // recupera o dado do frontend a partir do zod postBody
        // converte o texto enviado pelo frontend para as variaveis title, content e published
        const {title, content, published,userId} = postBody.parse(request.body)
        //cria um novo post no banco de dados
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                userId
            }
        })

        return newPost //retorna o novo post criado
    })

    //rota para atualizar um conteudo de  um post
    server.patch('/post/content',async(request)=>{ //server.patch atualizar só um campo no bd
        //cria um objeto zod para definir um esquema de dados
        const contentBody = z.object({
            id: z.number(),
            content: z.string()
        })
        //recupera os dados do frontend
        const {id,content} = contentBody.parse(request.body)
        //atualizar no banco de dados
        const postUpdated = await prisma.post.update({
            where: {
                id: id
            },
            data:{
                content:content
            }
        })
        return postUpdated
    })                                   
    //atualizar post
    server.patch('/post/content/published',async(request)=>{
        const contentBody = z.object({
            published: z.boolean(),
            id: z.number()
        })
        const {id,published} = contentBody.parse(request.body)
        const postUpdated = await prisma.post.update({
            where: {
                id: id
            },
            data:{
                published:published
            }
        })
        return postUpdated
    })

    //rota para remover um post do banco de dadis
    server.delete('/post/:id',async (request) =>{
        //criar objeto zod para esquema de dados
        const idParam = z.object({
            id: z.string()
        })
        //recupera o id do frontend
        const {id} = idParam.parse(request.params)
        const idInteger = Number(id)
        //remove do banco de dados
        const postDeleted = await prisma.post.delete({
            where: {
                id:idInteger
            }
        })
        return postDeleted
    })

    //Rota pra atualziar N campos do post
    server.put('/post',async(request)=>{
        // famoso objeto zod para o parametro :id
    
        // objeto zod para o corpo da requisição
        const putBody = z.object({
            "id": z.number(),           //ta roubando o ID do form ainda preenchido do front da tela pq quando clica no lapis ele volta as informação
            "title": z.string(),             //aspas entre o title pq JSON
            "content": z.string(),
            "published": z.boolean()
        })
        //recupera os dados do frontend
        
        const {id,title, content,published} = putBody.parse(request.body) 

       
        //efetuvamente atualizar no banco dedados
    const resposta = await prisma.post.updateMany({
            where:{
                id: id,
            },
            data: {
                title: title,
                content: content,
                published: published,
            }
        })
        return resposta
    })

    //rota para criar user
    server.post('/user', async (request)=>{
        const userBody = z.object({
            username: z.string(),
            password: z.string(),
            email: z.string()
        })

        let {username,password,email} = userBody.parse(request.body)
        
        const newUser = await prisma.user.create({
            data:{
                username,
                password,
                email
            }
        })
    })

    //rota para consulta os usuários
    server.get('/user', async () => {
        const user = await prisma.user.findMany()
        return user
    })
}
