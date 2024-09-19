const connection = require('../database/connection')
const PessoaController = require('../controller/pessoaController')

const express = require('express')
const route = express.Router()

route.get('/', (req,res) => {
    res.status(200).json({message: 'API is running!'})
})

route.post('/pessoa', PessoaController.novaPessoa)
route.get('/pessoa', PessoaController.listarPessoa)
route.get('/pessoa/:id', PessoaController.listarPessoaId)
route.put('/pessoa/:id', PessoaController.atualizarPessoa)
route.delete('/pessoa/:id', PessoaController.excluirPessoa)

module.exports = route