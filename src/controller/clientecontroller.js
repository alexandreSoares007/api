const db = require('../db/db');
//módulo de conexão co mo banco de dados 
const Joi = require('joi');
//bliblioteca de validação de dados 
const bcrypt = require('bcrypt'); //para encriptação de senhas 

//validação do Joi 

const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    //cpf deve ser uma string de extremamente 11 caracteres 
    nome: Joi.string().required().max(50),
    //nome deve ser uma string e é obrigatorio 
    endereco: Joi.string().required().max(80),
    //endereço deve ser uma string e é obrigatorio
    bairro: Joi.string().required().max(80),
    cidade: Joi.string().required.max(80),
    cep: Joi.string().required(),
    telefone: Joi.string().required(),
    //telefone deve ser uma string e é obrigatorio
    email: Joi.string().email().required().max(50),
    // email deve ser valido e é obrigatorio
    senha: Joi.string().required().min(6).max(300),
});

//listar todos os clientes 

exports.listarClientes = async (req, res) => {

    try{
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); //aqui retornamos apenas os dados da conta 
    } catch(err){
        console.error('erro ao buscar clientes:');
        res.status(500).json({error: 'erro interno no servidor'});
    }
};

// buscar cliente por cpf

exports.listarClientesCpf = async (req,res) =>{
    const {cpf} = req.params;
    try{
        const[result] = await db.query('SELECT * FROM cliente WHERE cpf = ? ' , [cpf]);
        if (result.length === 0 ) {
            return res.status(404).json({error: 'cliente não encontrado'})
        }
        res.json(result[0]);
    } catch (err){
        console.error('erro ao buscar cliente: ', err);
        res.status(500).json({error: 'erro interno no servidor'});
    }
};

//adicionar novo cliente 

exports.adicionarCliente = async (req, res) => {
    const{cpf,nome,endereco,bairro,cidade,cep,telefone,email,}
}