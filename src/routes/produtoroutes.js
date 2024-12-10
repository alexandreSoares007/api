const express = require('express');
const router = express.Router();
const produtocontroller = require('../controller/produtocontroller');

router.get('/produtos', produtocontroller.listarProduto);
router.get('/produtos/:idProduto',produtocontroller.listaridProduto);
router.get('/produtos/nome/:nomeProduto', produtocontroller.buscarProdutoNome);
router.post('/produtos',produtocontroller.adicionarProduto);
router.put('/produtos/:idProduto ', produtocontroller.atualizarProduto);
router.delete('/produtos/:idProduto',produtocontroller.deletarProduto);
module.exports = router