async function consultaPosts(){
    //consome  API e guarda o resultado em Posts (variavel)
    const posts = await fetch('http://localhost:3333/itens') //puxa lá do back a pagina q linka no BD
                            .then(resposta =>{ //espera a resposta do server voltar
                                return resposta.json()   //transoforma a resposta em .json
                            })
    let conteudoTabela = ''
    //percorre cada post presente na variavel post ( tipo um vetor )
    posts.forEach( post =>{
        //acumula na variavel conteudoTabela os dados de cada post
        conteudoTabela +=`<tr> <td> ${post.id} </td> <td> ${post.nome} </td> <td> ${post.setor} </td> <td> ${post.quantidade}<td> <button onClick="remover(${post.id})"><i class="bi bi-trash"></i></button></td><td><button onClick="editar(${post.id},'${post.nome}','${post.setor}',${post.quantidade})"<i class="bi bi-pencil"></button></i> </td> </tr>`
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
    await fetch(`http://localhost:3333/x/${id}`,{
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

function editar(id,nome,setor,quantidade){
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("setor").value = setor;
    document.getElementById("quantidade").value = quantidade;
    document.getElementById("validade").value = validade;
}

//consome que api que cadastra um post no banco de dados
async function confirmar(){
    //recupera os dados do formulário
    const id = Number(document.getElementById("id").value)
    const nome= document.getElementById("nome").value
    const setor = document.getElementById("setor").value
    const quantidade = document.getElementById("quantidade").value //responde se ta checado ou nn (true/false)
    

    if(id)   { //ele atualiza
        corpo = {id,nome,setor,quantidade}    //aqui passa com ID pq ja que ta atualizando tem q ter o msm id do post original
        verbo = 'PUT'
    }
    else { 
        corpo = {nome,setor,quantidade} //aqui ta criando do zero int pode deixar o BD criar o id tumatico 🍕🍕 
        verbo = 'POST'
    }

    //chama a api
    const post = await fetch('http://localhost:3333/post',{
        method: verbo,   //e ja que dependendo se tem um ID ou nao aqui tem q ser variavel o metodo
        body: JSON.stringify(corpo), // JSON transformado em string
        headers: {
            "setor-Type": "application/json;charset=UTF-8"
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
document.getElementById("nome").value = ""
document.getElementById("setor").value = ""
document.getElementById("sim").checked = false
document.getElementById("nao").checked =false
}