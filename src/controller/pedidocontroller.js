const db = require('../db/db')
const Joi = require('joi')

const pedidoShema = Joi ({
    idpedido : Joi.string().required(),
    dataPedido: Joi.string.required()
})