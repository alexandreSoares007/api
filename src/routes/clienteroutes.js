const express = require('express');
const router = express.Router();
const clienteController = require ('../controller/clientecontroller'); // importa o controller do cliente

//rota para listar um cliente os clientes
router.get('/clientes',clienteController.listarClientes);

//rota para buscar um cliente por cpf 
router.get('/clientes/:cpf',clienteController.listarClientesCpf);

//rota par adicionar um novo cliente
router.post('/clientes',clienteController.adicionarCliente);

//rota para atualizar um cliente por cpf
router.put('/clientes/:cpf',clienteController.atualizarCliente);

//rota para deletar um cliente cpf. 
router.delete('/clientes/:cpf',clienteController.deletarCliente);

module.exports = router;