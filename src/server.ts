import express from 'express'
import Routes from './Router/root'
const app = express();

app.use(express.json())

app.use(Routes)

app.listen( 3000, () => 'Servidor rodando na porta 3000' )