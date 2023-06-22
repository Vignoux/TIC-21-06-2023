//importa a dependenca fastify
import fastify from 'fastify'
//importa as roas 
import { AppRoutes } from './routes'

//importa a dependencia cors
//import cors from '@fastify/cors'
import cors from '@fastify/cors'

//cria um objeto da classe Fastify
const server = fastify()

//registra as roas
server.register(AppRoutes)

//registra o cors
server.register(cors)

//subir server HTTP
server.listen({
    port: 3333
})
.then ( () =>{
    console.log('Http server running')
})

//dependencia zod: serve pra recuperar dados do front
//request.body = > recupera dado presente no body
//get vc escreve no back e url; post vc escreve na pagina msm
//whatever.put atualizar todos os campos no BD
// verbo PUT --> atualizar N campos => parece com o post, mas poe no body todas as infos que precisam ser atualizadas
//CORS é uma dependencia que se instala via npm install cors para permitir o acesso do front aos APIs do back,mas ja q o fastify ja tem o cors , coloca npm isntal @fastify/cors 





