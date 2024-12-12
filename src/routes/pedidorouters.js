const express=require('express')
const router=express.Router();
const pedidoController=require('../controller/pedidocontroller');
 
router.get('/pedido', pedidoController.listarpedido);
 
router.get('/pedido/:idpedido', pedidoController.listarpedidosid);
 
router.post('/pedido', pedidoController.adicionarPedido);
 
router.put('/pedido/idpedido',pedidoController.adicionarPedido )
 
router.delete('/pedido/:idpedido', pedidoController.deletarpedido)
 
module.exports = router