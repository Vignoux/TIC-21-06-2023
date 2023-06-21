--24/03/2023

CREATE TABLE tb_empregados(
rg		VARCHAR(11),
nome	VARCHAR(60),
idade	INTEGER,
CONSTRAINT pk_tb_emp_rg PRIMARY KEY(rg))

SELECT*
FROM tb_empregados;

CREATE TABLE tb_pedidos(
numero	INTEGER,
ds_pedido	VARCHAR(40),
dt_pedido	DATE,
CONSTRAINT pk_tb_pedidos_nr PRIMARY KEY(numero));

CREATE TABLE tb_itens(
nr_pedido	INTEGER,
nr_item	INTEGER,
ds_produto	VARCHAR(60),
quantidade	INTEGER,
CONSTRAINT pk_tb_itens_pedido_item
	PRIMARY KEY(nr_pedido, nr_item),  --chave primaria composta   isso pra settar como elemento fraco
CONSTRAINT fk_tb_itens_pedido 
	FOREIGN KEY(nr_pedido)
		REFERENCES tb_pedidos(numero)
);

SELECT NOW()
-------------------------------------------------------------------------------------------------------------
--Excluindo o objeto table "tb_empregados"
DROP TABLE tb_empregados CASCADE;     --cascade deleta tudo q se relaciona a essa table

--Criando novamente o objeto "tb_empregados"
CREATE TABLE tb_empregados(
rg		VARCHAR(11),
nm_empregado VARCHAR(60),
idade		INTEGER,
plano_saude VARCHAR(20),
rua			VARCHAR(40),
numero		VARCHAR(5),
cidade		VARCHAR(20),
CONSTRAINT pk_tb_emp_rg PRIMARY KEY (rg)
);

--Criando o objeto tb_telefones"
CREATE TABLE tb_telefones(
rg		VARCHAR(11),
nr		VARCHAR(15),
CONSTRAINT pk_tb_telefones_rg_nr
	PRIMARY KEY(rg,nr),
CONSTRAINT fk_tb_telefones_rg
	FOREIGN KEY(rg) REFERENCES
		tb_empregados(rg)
	);
	


--Criando o objeto "tb_servidores"
--Entidade generica
CREATE TABLE tb_servidores(
cpf		VARCHAR(11),
nm_servidor	VARCHAR(60),
CONSTRAINT pk_tb_servidores_cpf PRIMARY KEY (cpf));

--CRIANDO o objeto "tb_funcionarios"
--ENtidade especializada
CREATE TABLE tb_funcionarios(
cpf		VARCHAR(11),
funcao		VARCHAR(20),
CONSTRAINT pk_tb_funcionario_cpf
	PRIMARY KEY (cpf),
CONSTRAINT fk_rb_funcionarios_cpf
	FOREIGN KEY(cpf) REFERENCES
		tb_servidores(cpf)
);

--Criando o objeto "tb_profesores"
CREATE TABLE tb_professores(
cpf		VARCHAR(11),
titulacao		VARCHAR(20),
categoria		VARCHAR(5),
CONSTRAINT pk_tb_professores_cpf
	PRIMARY KEY(cpf),
CONSTRAINT fk_tb_profesores_cpf
	FOREIGN KEY(cpf) REFERENCES
		tb_servidores(cpf)
);

--CRIANDO o objeto "tb_pessoas"
CREATE TABLE tb_pessoas(
codigo		INTEGER,
nm_pessoas		VARCHAR(60),
CONSTRAINT pk_tb_pessoas_codigo
	PRIMARY KEY(codigo)
);

--criando o objeto "tb_cnh"
--vamos configurar as seguintes restricoes:
--(a)chave-primária
--(b)chave-estrangeira
--(c)unicidade "valores exclusivos"
CREATE TABLE tb_cnh(
numero 		INTEGER,
dt_expedicao	DATE,--------------------------------chave composta tende a significar N pra N
validade		DATE,
categoria		VARCHAR(5),
codigo		INTEGER CONSTRAINT uq_tb_cnh_codigo UNIQUE,    --faz com q so possa ter um desse item por ""tabela"" (nao é exclusivo da chave primaria)
dt_retirada		DATE,
CONSTRAINT pk_tb_cnh_nr PRIMARY KEY(numero),
CONSTRAINT fk_tb_cnh_codigo FOREIGN KEY(codigo)
		REFERENCES tb_pessoas(codigo)
);
--Criando o objeto "tb_homens"
CREATE TABLE tb_homens(
rg		VARCHAR(11),
nm_homem	VARCHAR(60),
CONSTRAINT pk_tb_homens_rg PRIMARY KEY(rg)
);

--Criando o objeto "tb_mulheres"
CREATE TABLE tb_mulheres(
rg		VARCHAR(11),
nm_mulher	VARCHAR(60),
CONSTRAINT pk_tb_mulheres_rg PRIMARY KEY(rg)
);

--Criando  o objeto "tb_casamentos"  -- já que a relação tem proprias especificaçoes (data) tem q criar outra table
CREATE TABLE tb_casamentos(
rg_homem		VARCHAR(11),
rg_mulher		VARCHAR(11) CONSTRAINT uq_tb_casamentos_rg_mulher UNIQUE,
dt_casamento	DATE,
CONSTRAINT pk_tb_casamentos_rg_homem
	PRIMARY KEY(rg_homem),
CONSTRAINT fk_tb_casamentos_rg_homem
	FOREIGN KEY(rg_homem)REFERENCES tb_homens(rg),
CONSTRAINT fk_tb_casamentos_rg_mulher
	FOREIGN KEY(rg_mulher)REFERENCES tb_mulheres(rg)
);

--remove o objeto "tb_empregados"
DROP TABLE tb_empregados CASCADE;

--criando departamentos
CREATE TABLE tb_departamentos(
codigo	INTEGER,
nm_depto	VARCHAR(40),
CONSTRAINT pk_tb_depto_codigo PRIMARY KEY(codigo)
);

--Criando o objeto "tb_empregados"
CREATE TABLE tb_empregados(
cpf		VARCHAR(11),
nm_empregados	VARCHAR(60),
cod_depto	INTEGER 
	CONSTRAINT nn_tb_emp_cod_dept NOT NULL, 
	--o nn no começo pede que seja not null (nao nulo) pq no esquema do slide 6 pede que seja 1:n,
	--entao PRECISA ter alguem/algo
dt_lotacao	DATE,
CONSTRAINT pk_tb_emp_cpf PRIMARY KEY(cpf),
CONSTRAINT fk_tb_emp_cod_depto FOREIGN KEY(cod_depto)
		REFERENCES tb_departamentos(codigo)
);


-------------------------------------------------------------------------------------------------------------
--tracinho por baixo é chave ´primaria, e por cima é estrangeira

--grau do relacionamento voce conta quantos ""processos""" tem

--04/04--


--excluindo o objeto pre existente "tb_empregados"
DROP TABLE tb_empregados CASCADE;     -- Apaga tudo relacionado 

--criando o objeto "tb_empregados"
CREATE TABLE tb_empregados(
rg		VARCHAR(11),
nm_empregados		VARCHAR(60),
CONSTRAINT pk_tb_empregados_rg PRIMARY KEY(rg));

--criando o objeto "tb_projetos"
CREATE TABLE tb_projetos(
codigo		INTEGER,
nm_pojeto		VARCHAR(40),
CONSTRAINT pk_tb_projetos_codigo PRIMARY KEY (codigo));

--criando o objeto "tb_participacao" (relacionamento N:N)
CREATE TABLE tb_participacao(
rg		VARCHAR(11),
codigo		INTEGER,
dt_inicio	DATE,
CONSTRAINT pk_tb_participacao_rg_cod PRIMARY KEY(rg,codigo),
CONSTRAINT fk_tb_participacao_rg FOREIGN KEY (rg)
	REFERENCES tb_empregados(rg),
CONSTRAINT fk_tb_participacao_cod FOREIGN KEY(codigo)
	REFERENCES tb_projetos(codigo));
	
	--Excluindo o objeto pre-existente "tb_empregados"
DROP TABLE tb_empregados CASCADE;

--Criando novamente o objeto "tb_empregados"
CREATE TABLE tb_empregados(
rg		VARCHAR(11),
nm_empregado		VARCHAR(60),
idade		INTEGEr,
rg_gerente		VARCHAR(11),
CONSTRAINT pk_tb_empregados_rg PRIMARY KEY(rg),
CONSTRAINT fk_tb_empregados_rg_gerente FOREIGN KEY (rg_gerente)
	REFERENCES tb_empregados(rg));
	
--Testando o auto-relacionamento
--Exibir o nome do empregado juntamente com o nome do seu respectiovo gerente

INSERT INTO tb_empregados(rg, nm_empregado, idade, rg_gerente)
VALUES
('1','Ana Carolina', NULL, NULL),
('2','Arthur','19','1'),
('3','Brenda', NULL, '1'),
('4','Enzo','20',1),
('5','Laysa',NULL,'2');

--Exibindo o relatório modo SQL ANSI 86
SELECT e. nm_empregado || 'Trabalha para ' || g.nm_empregado       -- aletra antes é para apelidar a tabela
	from tb_empregados e,
			tb_empregados g   --aqui da o apelido pra tabela (e ja q é auto referenciamento a msm tem 2 apelidos)
WHERE e. rg_gerente = g.rg;

--SQL ANSI 2016
SELECT e. nm_empregado || 'trabalha para '	
		|| g. nm_empregado 'Quem trabalha para quem?' --!!falho!!  (eu falhei no caso pq funciona)
FROM tb_empregados e
INNER JOIN tb_empregados g ON(e.rg_gerente = g.rg);  --ON(e.rg_gerente = g.rg) é o predicado da função


--criando o objeto "tb_clientes"
CREATE  TABLE tb_clientes(
rg_cliente		VARCHAR(11),
nm_cliente		VARCHAR(60),
dt_nascimento		DATE,
CONSTRAINT pk_tb_clientes_rg_clientes PRIMARY KEY (rg_cliente));

--criando o objeto "tb_bibliotecarias"
CREATE TABLE tb_bibliotecarias(
rg_bibliotecaria		VARCHAR(11),
nm_bibliotecaria		VARCHAR(60),
dt_nascimento			DATE,
CONSTRAINT pk_tb_biblio_rg_biblio PRIMARY KEY(rg_bibliotecaria)
);


--criando o objeto "tb_livros"
CREATE TABLE tb_livros(
codigo		INTEGER,
ds_livro	VARCHAR(40),
rg_cliente	VARCHAR(11),
dt_devolucao DATE,
rg_bibliotecaria	VARCHAR(11),
CONSTRAINT pk_tb_livros_codigo PRIMARY KEY(codigo),
CONSTRAINT fk_tb_livros_rg_cliente FOREIGN KEY(rg_cliente)
	REFERENCES tb_clientes(rg_cliente),                           --isso daqui a tabela livros tem o rg_clientes q nem o tb_clientes, mas tem sua fk oq significa que pode relacionar um ao outro????? 
CONSTRAINT fk_tb_livros_rg_biblio FOREIGN KEY(rg_bibliotecaria)	  
	REFERENCES tb_bibliotecarias(rg_bibliotecaria));
	
--excluindo o objeto "tb_clientes"
DROP TABLE tb_clientes CASCADE;

--Criando o objeto "tb_clientes" novamente
CREATE TABLE tb_clientes(
rg		VARCHAR(11),
nm_cliente		VARCHAR(60),
dt_nascimento	DATE,
CONSTRAINT pk_tb_clientes_rg PRIMARY KEY(rg));

--criando o objeto "tb_contas"
CREATE TABLE tb_contas(
numero		INTEGER,
agencia		INTEGER,
tipo		VARCHAR(10),
CONSTRAINT pk_tb_contas_nr PRIMARY KEY(numero));

--criando o objeto "tb_correntistas" - entidade associativa (N:N)
CREATE TABLE tb_correntistas(
rg_cliente		VARCHAR(11),
numero			INTEGER,
CONSTRAINT pk_tb_correntistas_rg_nr PRIMARY KEY (rg_cliente, numero),
CONSTRAINT fk_tb_correntistas_rg FOREIGN KEY (rg_cliente)
		REFERENCES tb_clientes(rg),
CONSTRAINT fk_tb_correntistas_nr FOREIGN KEY (numero)
		REFERENCES tb_contas(numero));
		
--criando o objeto "tb_cartoes_magneticos"
CREATE TABLE tb_cartoes_magneticos(
nr_cartao		INTEGER,
dt_expedicao	DATE,
rg_cliente		VARCHAR(11),
nr_conta		INTEGER,
CONSTRAINT pk_tb_cm_nr PRIMARY KEY(nr_cartao),
CONSTRAINT fk_tb_cm_rg_cliente FOREIGN KEY(rg_cliente),
	REFERENCE(rg_clientes) )