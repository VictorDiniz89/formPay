const database = require('../database/connection')

class PessoaController {
    novaPessoa(req, res){
        const {nome, email, telefone, cidade, igreja} = req.body
        console.log(nome, email, telefone, cidade, igreja)

        database.insert({nome, email, telefone, cidade, igreja}).table('pessoa').then(data=>{
            console.log(data)
            res.json({message:'Pessoa cadastrada com sucesso!'})
        }).catch(error =>{
            console.log(error)
        })
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