
const db = require('../db/db');
const Joi = require('joi');
const pedidoSchema = Joi.object({
    dataPedido: Joi.string().required().max(50),
    qtdeItens: Joi.string().required(),
    formaPagto: Joi.string().required(),
    valorTotal: Joi.string().required(),
    observacao: Joi.string().required().max(50),
    cpf: Joi.string().length(11).required().max(50),
    idEntregador: Joi.string().required().max(50)
})
 
exports.listarpedido = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM PEDIDO')
        res.json(result);
    } catch (err) {
        console.error('Error ao buscar pedido', err);
       
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}
 
exports.listarpedidosid = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idPedido =?', [idPedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'pedido não encontrado' });
        }
        res.json(result[0])
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({ error: 'Erro ao buscar pedido:' });
 
    }
}
 
exports.adicionarPedido = async (req, res) => {
    const {dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;
 
    const { error } = pedidoSchema.validate({
         dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador
    });
    if (error) {
        return res.status(400).json({ error: error.details[0] })
    } try {
        const novopedido = {  dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador };
        await db.query('INSERT INTO pedido SET ?', novopedido);
        res.json({ menssage: 'pedido adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adiconar pedido', err);
        res.status(500).json({ error: 'Erro ao adicionar pedido' })
    }
};
 
exports.atualizarpedido = async (req, res) => {
    const { idPedido } = req.params;
    const { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;
    const { error } = produtoSchema.validate({ idPedido, dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
 
    }
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idpedido = ?', [idPedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'pedido não encontrado' });
        }
    } catch (err) {
        console.error('Erro ao atualizar pedido', err);
        res.status(500).json({ error: 'Error ao atualizar o pedido' })
    }
};    
 
exports.deletarpedido=async(req,res)=>{
    const{idPedido}=req.params;
    try{
    const[result]=await db.query('SELECT *  FROM pedido WHERE idpedido=?',[idPedido]);
    if (result.length===0) {
        return res.status(404).json({error:'pedido Não encontrado'});
    }
    await db.query('DELETE FROM prouto WHERE idpedido=?',[idPedido])
    res.json({message:'pedido deletado com sucesso'})
   }catch(err){
    console.error('Erro ao deletar pedido',err);
    res.status(500).json({error:'Error ao deletar o cliente'})
   }
   };
 
exports.buscarpedidoCPF =async(req,res)=>{
    const {nomepedido}=req.params;
 
    try{
        const[result]=await db.query('SELECT * FROM pedido WHERE nomepedido LIKE?',[`${nomepedido}%`]);
        if (result.length===0) {
            return res.status(404).json({error:'pedido não encontrado'});
        }
        res.json(result);
    }catch(err){
        console.error('Erro ao buscar pedido',err);
       res.status(500).json({error:'Erro interno do servidor'})
    }
}; 