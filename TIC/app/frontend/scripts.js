async function consultaPosts(){
    //consome  API e guarda o resultado em Posts (variavel)
    let aux = document.cookie.split('=')
    let userId = Number(aux[1])
    const posts = await fetch('http://localhost:3333/posts') //puxa lá do back a pagina q linka no BD
                            .then(resposta =>{ //espera a resposta do server voltar
                                return resposta.json()   //transoforma a resposta em .json
                            })
    let conteudoTabela = ''
    //percorre cada post presente na variavel post ( tipo um vetor )
    posts.forEach( post =>{
        //acumula na variavel conteudoTabela os dados de cada post
        conteudoTabela +=`<tr> <td> ${post.id} </td> <td> ${post.title} </td> <td> ${post.content} </td> <td> ${post.published}<td> <button onClick="remover(${post.id})"><i class="bi bi-trash"></i></button></td><td><button onClick="editar(${post.id},'${post.title}','${post.content}',${post.published})"<i class="bi bi-pencil"></button></i> </td> </tr>`
    })  
    // bora jogar os dados no HTML
    document.getElementById("corpoTabela").innerHTML = conteudoTabela
}

async function remover(id){
    const confirmacao = confirm('Confirma a exclusão do post?')   //lança uma opção de sim e não
    if(!confirmacao){ //clicou em NOPE
        return
    }
    //clicou em YE
    await fetch(`http://localhost:3333/post/${id}`,{
        method: 'DELETE'
    })
    .then(resposta =>{
        alert('Remoção realizada')
    })
    .catch(error =>{
        alert('Problema encontrado seu bosta')
    })
    consultaPosts()
}

function editar(id,title,content,published){
    document.getElementById("id").value = id;
    document.getElementById("title").value = title;
    document.getElementById("content").value = content;
    (published) ? document.getElementById("sim").checked = true: document.getElementById("nao").checked = true;
}

//consome que api que cadastra um post no banco de dados
async function confirmar(){
    //recupera os dados do formulário
    const id = Number(document.getElementById("id").value)
    const title= document.getElementById("title").value
    const content = document.getElementById("content").value
    const published = document.getElementById("sim").checked //responde se ta checado ou nn (true/false)
    

    if(id)   { //ele atualiza
        corpo = {id,title,content,published}    //aqui passa com ID pq ja que ta atualizando tem q ter o msm id do post original
        verbo = 'PUT'
    }
    else { 
        corpo = {title,content,published} //aqui ta criando do zero int pode deixar o BD criar o id tumatico 🍕🍕 
        verbo = 'POST'
    }

    //chama a api
    const post = await fetch('http://localhost:3333/post',{
        method: verbo,   //e ja que dependendo se tem um ID ou nao aqui tem q ser variavel o metodo
        body: JSON.stringify(corpo), // JSON transformado em string
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
    .then(resposta =>{
        alert('Operação realizada com sucesso')
    })
    .catch(error =>{
        alert('Operação falhou')
    })
    //atualiza a tabela
    consultaPosts()

//limpa os campos
document.getElementById("id").value=""
document.getElementById("title").value = ""
document.getElementById("content").value = ""
document.getElementById("sim").checked = false
document.getElementById("nao").checked =false
}