import { FastifyInstance } from "fastify"
import {z} from 'zod'
import { prisma } from "./lib/prisma"
export async function AppRoutes(server:FastifyInstance){
    
    server.get('/itens', async()=> {
        const itens = await prisma.post.findMany()
        return itens
    })

    server.post('/itens', async(request)=>{
        const postBody = z.object({
            nome: z.string(),
            setor: z.string(),
            quantidade: z.number(),
            validade: z.date(),
            userid: z.number(),
        })
        const {nome, setor, quantidade,validade,userid} = postBody.parse(request.body) 
        const novoItem = await prisma.post.create({
            data: {
                nome:nome,
                setor:setor,
                quantidade:quantidade,
                validade:validade,
                userId:userid,
            }
        })

        return novoItem
    })
    server.patch('/itens/edit/qtd',async(request)=>{ 
        const contentBody = z.object({
            id: z.number(),
            quantidade: z.number()
        })
        const {id,quantidade} = contentBody.parse(request.body)
        const qtdUpdate = await prisma.post.update({
            where: {
                id: id
            },
            data:{
                quantidade:quantidade,
            }
        })
        return qtdUpdate
    })                                   
    server.patch('/itens/edit/nome',async(request)=>{
        const contentBody = z.object({
            nome: z.string(),
            id: z.number()
        })
        const {id,nome} = contentBody.parse(request.body)
        const itemUpdate = await prisma.post.update({
            where: {
                id: id
            },
            data:{
                nome:nome,
            }
        })
        return itemUpdate
    })

    server.delete('/x/:id',async (request) =>{
        const idParam = z.object({
            id: z.string()
        })
        const {id} = idParam.parse(request.params)
        const idInteger = Number(id)
        const itemDelete = await prisma.post.delete({
            where: {
                id:idInteger
            }
        })
        return itemDelete
    })

    server.put('/post',async(request)=>{
        const putBody = z.object({
            "id": z.number(),           
            "nome": z.string(),             
            "setor": z.string(),
            "quantidade": z.number(),
            "validade":z.date(),
        })
        const {id,nome, setor,quantidade,validade} = putBody.parse(request.body)  

    const resposta = await prisma.post.updateMany({
            where:{
                id: id,
            },
            data: {
                nome:nome,
                setor:setor,
                quantidade:quantidade,
                validade:validade,
            }
        })
        return resposta
    })


    server.post('/user', async (request)=>{
        const userBody = z.object({
            username: z.string(),
            password: z.string(),
            codigo: z.string()
        })

        let {username,password,codigo} = userBody.parse(request.body)
        
        const newUser = await prisma.user.create({
            data:{
                username,
                password,
                codigo
            }
        })
    })

   
    server.get('/user', async () => {
        const user = await prisma.user.findMany()
        return user
    })
}
