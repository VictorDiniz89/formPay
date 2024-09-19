const database = require('../database/connection')
const  { getValorLote } = require('../service/lotePagamento') 
const { criaPagamento } = require('../service/payment') 
const { randomUUID }  = require('node:crypto');
const Joi = require('joi');


class PessoaController {
    async novaPessoa(req, res){
        const schema = Joi.object({
            nome: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            telefone: Joi.string().min(10).required(),
            cidade: Joi.string().required(),
            igreja: Joi.string().required()
        })

        const {error} = schema.validate(req.body)
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }

        try {
            const {nome, email, telefone, cidade, igreja} = req.body
            const clientId = randomUUID()
            const paymentId = randomUUID()
            const status = 'pending'
            
            console.log(nome, email, telefone, cidade, igreja)

            const data = await database.insert({nome, email, telefone, cidade, igreja, clientId, paymentId, status}).table('pessoa')
            console.log(data)
            const pagamentoData =  await criaPagamento(email, paymentId, getValorLote())
            console.log(pagamentoData)

            
           const response = {
            clientId,
            pid: paymentId,
            nome, 
            cidade,
            igreja,
            pixCopiaCola: pagamentoData.point_of_interaction.transaction_data.qr_code,
            status: status
           }

           res.status(200).json(response)

        } catch (error) {
            console.log(error)
        }
    }

    listarPessoa(req, res){
       database.select('*').table('pessoa').then(cadastro =>{
        console.log(cadastro)
        res.json(cadastro)
       }).catch(error =>{
        console.log(error)
       })
    }

    listarPessoaId(req, res){
        const id = req.params.id

        database.select('*').table('pessoa').where('id', id).then(cadastro =>{
            res.json(cadastro)
        }).catch(error =>{
            console.log(error)
        })
    }

    atualizarPessoa(req, res){
        const id = req.params.id
        const { nome, email, telefone, cidade, igreja } = req.body

        database.where('id', id).update({ nome, email, telefone, cidade, igreja }).table('pessoa').then(data =>{
            res.json({message: 'Pessoa atualizada com sucesso'})
        }).catch(error => {
            console.log(error)
        })
    }

    excluirPessoa(req, res){
        const id = req.params.id

        database.where('id', id).delete().table('pessoa').then(data =>{
            res.json({message: 'Pessoa removida com sucesso!'})
        }).catch(error =>{
            console.log(error)
        })
    }
}

module.exports = new PessoaController()