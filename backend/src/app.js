const express = require('express') // Importando o módulo chamado express para a constante express
const routes = require('./routes') // Usa-se o ponto barra para indicar que é um arquivo e não um pacote
const cors = require('cors')
const app = express() // Instância a aplicação
const { errors } = require('celebrate')

app.use(cors()) // Sistema de segurança, ele é usado para que somente o front-end passado como parâmetro possa acessar esse back-end
app.use(express.json()) // Antes das requisições o express vai no corpo da requisição e tranforma ele em um objeto do javaScript
app.use(routes) // Usa as rotas criadas
app.use(errors())

//app.listen(3333) // Permite acessar a aplicação em localhost porta 3333 no navegador

module.exports = app








/*
Rota / Recurso
*/

/**
Métodos HTTP

GET: Buscar/Listar uma informação do back-end
POST: Criar uma informação no back-end
PUT: Alterar(atualizar) uma informação no back-end
DELETE: Deletar uma informação no back-end
*/

/*
Tipos de parâmetros

Query params: Parâmetors nomeados enviados na rota após "?" (filtros, paginação)
Route params: Parâmetros utilizados para identificar recursos
Request body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
NoSQL: MongoDB, CouchDB, etc

Driver: SELECT * FROM users
Query Builder: table('users').select('*').where()
*/

