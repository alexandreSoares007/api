const mysql = require('mysql2/promisse');
require('dotenv').config(); //carrega ambiente as variáveis de ambiente 
//cria um pool de conexões com promises 
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//teste a conexão ao iniciar a aplicação 

(async () => {
    try{
        const connection = await db.getConnection();
        console.log('conexão com o banco de dados estabelecida com sucesso!');
        connection.release(); //libera a conexão de volta para o pool 
    } catch (err){
        console.error('erro ao conectar ao banco de dados;', err);
    }
})(); 

module.exports = db;