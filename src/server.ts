import express from 'express';
import root from './Router/Root';
import user from './Router/user';
import db from './Model/Db';
import bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.json())
app.use(express.json())

//Rodando a ROTA padrão da API
app.use(root)
//Rodando as ROTAS do USER
app.use(user)

const PORT = 3000
// Conectar ao banco de dados
db().then(() => {
  // Iniciar o servidor depois de conectar ao banco de dados
  app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error)
})