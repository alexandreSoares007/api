//importação de todas as dependências 
require('dotenv').config();
//carrega variáveis de ambiente de um arquivo .env
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db/db')

const routes = require('./routes/routes'); //Importar as rotas 
const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'], //Lista de origens permitidas
    methods: 'GET,POST, PUT,PATCH, DELETE',//métodos http permitidos 
    Credentials: true, //permite o envio de cookies
}
const app = express();

//o app irá receber o express e todas sua dependências 
//middlewares de segurança e utilidades 
app.use(helmet()); //protege a aplicação com headers de segurança 
app.use(cors(corsOptions)); //Habilidadeso cors 
app.use(morgan('dev')); // Loga as requisições no console 
app.use(express.json()); //Converte os dados recebidos para JSON.
//servindo arquivos estáticos 

app.use(express.static(path.join(__dirname, 'public')));//Pasta de arquivos estáticos 
// o path retorna o caminho de forma dinâmica 
// rota para servir o home.html como sendo página principal 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

//configuração de rotas 
//após declarar nossas rotas, aqui falamos para nosso app usar elas como referencia 
app.use('/', routes);

//middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// inicialização do servidor 
//aqui definidos quem irá escutar nosso chamado e nos presponder
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});