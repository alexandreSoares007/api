const { hash } = require('bcrypt');
const db = require('../db/db');
//módulo de conexão co mo banco de dados 
const Joi = require('joi');

//validação do Joi 

const produtoSchema = Joi.object({
    idProduto: Joi.string().length().required(),
    nomeProduto: Joi.string().required().max(30),
    tipo: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    valorUnit: Joi.string().required(),
    imagem: Joi.string().required().max(300)
});

exports.listarProduto = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM  produto');
        res.json(result);
    } catch (err) {
        console.error('erro ao buscar clientes:', err);
        res.status(500).json({ error: 'erro interno no servidor' });
    }
};

//buscar produto por id 

exports.listaridProduto = async (req, res) => {
    const { idProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ? ', [idProduto]);
        if (result.length === 0) {
            return res.status(404).json({ eror: 'produto não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('erro ao buscar produto:', err);
        res.status(500).json({ error: 'erro interno no servidor' });
    }
};

//adicionar produto

exports.adicionarProduto = async (req, res) => {
    const { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem } = req.body;
    const { error } = produtoSchema.validate({ idProduto, nomeProduto, tipo, descricao, valorUnit, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const novoProduto = { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem};
        await db.query('INSERT INTO produto  ? ',novoProduto);
        res.json({message: 'produto adicionado com sucesso'});
    }catch (err){
        console.error('erro ao adicionar o produto', err);
        res.status(500).json({error:'erro ao adiconar produto'});
    }
};

exports.atualizarProduto = async (req,res) =>{
    const {idProduto} = req.params;
    const{nomeProduto,tipo,descricao,valorUnit,imagem} = req.body;
    const{error} = produtoSchema.validate({})
}