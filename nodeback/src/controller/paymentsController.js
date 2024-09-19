const MercadoPago = require('mercadopago');
const { criaPagamento } = require('../service/payment');
const database = require('../database/connection')
const {getValorLote} = require("../service/lotePagamento")

module.exports = {
    async statusPagamento(req, res){
        
        const {clientId} = req.params

        const [pessoa] = await database.select('*').table('pessoa').where('clientId', clientId)
        console.log(pessoa)
        try {
            const pagamentoData =  await criaPagamento(pessoa.email, pessoa.paymentId, getValorLote())

           const response = {
            clientId,
            pid: pessoa.paymentId,
            pixCopiaCola: pagamentoData?.point_of_interaction?.transaction_data.qr_code || 'error_reading_pix',
            status: pagamentoData.status || 'pending'
           }

           if (pagamentoData.status === 'approved' && pessoa.status === 'pending') {
            await database.update({status: 'approved'}).table('pessoa').where('id', pessoa.id)
           }

           return res.status(200).json(response)

        } catch (error) {
            console.error(error)
            res.status(400).json({error: 'Erro ao processar pagamento'})
        }
        
    },

    async recriaPagamento(req, res){
        
        const {clientId} = req.params

        const [pessoa] = await database.select('*').table('pessoa').where('clientId', clientId)
        const paymentId = randonUUID()

        await database.update({paymentId}).table('pessoa').where('id', pessoa.id)


        try {
            const pagamentoData =  await criaPagamento(pessoa.email, paymentId, getValorLote())

           const response = {
            clientId,
            pid: paymentId,
            pixCopiaCola: pagamentoData?.point_of_interaction?.transaction_data.qr_code || 'error_reading_pix',
            status: pagamentoData.status || 'pending'
           }

           return res.status(200).json(response)

        } catch (error) {
            console.error(error)
            res.status(400).json({error: 'Erro ao processar pagamento'})
        }
    }
}

