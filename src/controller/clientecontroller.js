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
    cidade: Joi.string().required().max(80),
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
        console.error('erro ao buscar clientes:',err);
        res.status(500).json({error: 'erro interno no servidor'});
    }
};

// buscar cliente por cpf

exports.listarClientesCpf = async (req,res) =>{
    const {cpf} = req.params;
    try{
        const[result] = await db.query('SELECT * FROM cliente WHERE cpf = ? ' , [cpf]);
        if (result.length === 0 ) {
            return res.status(404).json({error: 'cliente não encontrado'});
        }
        res.json(result[0]);
    } catch (err){
        console.error('erro ao buscar cliente: ', err);
        res.status(500).json({error: 'erro interno no servidor'});
    }
};

//adicionar novo cliente 

exports.adicionarCliente = async (req, res) => {
    const{cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha} = req.body;
    //variação de dados 
    const{error} = clienteSchema.validate({cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha});
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
     try {
        const hash  = await bcrypt.hash(senha, 10);
        const novoCliente = {cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha : hash};
        await db.query('INSERT INTO cliente SET ?', novoCliente);
        res.json({message: 'cliente adicionado com sucesso'});
    } catch (err){
        console.error('Erro ao adicionar cliente:',err);
        res.status(500).json({error:'erro ao adicionar cliente'});   
    }
};

//atualiza cliente 

exports.atualizarCliente = async (req,res) => {
    const {cpf} = req.params;
    const{nome,endereco,bairro,cidade,cep,telefone,email,senha} = req.body;
    //validar dados 
    const{error} = clienteSchema.validate({cpf,nome,endereco,bairro,cidade,cep,telefone,email,senha});
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }
    try{
        //verifica se o cliente existe antes de atualizar 
        const[result] = await db.query('SELECT * FROM cliente WHERE cpf = ?',[cpf]);
        if (result.length === 0 ) {
            return res.status(404).json({error: 'cliente não encontrado'});
        }
        //criptografando a senha 
        const hash = await bcrypt.hash(senha, 10);
        const ClienteAtualizado = {nome,endereco,bairro,cidade,cep,telefone,email,senha: hash};
        await db.query('UPDATE cliente SET ? WHERE cpf = ?',[ClienteAtualizado,cpf]);
        res.json({message: 'Cliente atualizado com sucesso'});
    }catch (err){
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({error:'erro ao atualizar cliente'});
    }
};

//deletar cliente 
exports.deletarCliente = async (req,res) => {
    const {cpf} = req.params;
    try{
        //verifica se o cliente existe antes de deletar 
        const[result] = await db.query('SELECT * FROM cliente WHERE cpf = ?',[cpf]);
        if (result.length === 0) {
            return  res.status(404).json({error: 'cliente não encontrado'});
        }
        await db.query('DELETE FROM cliente WHERE cpf = ?',[cpf]);
        res.json({message: 'cliente deletado com sucesso'});
    } catch (err){
        console.error('Erro ao deletar cliente:',err);
        res.status(500).json({error: 'erro ao deletar cliente'});
    }
};