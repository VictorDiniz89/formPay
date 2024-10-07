const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//require('./src/config/getEnv')();

const knex =  require('./src/database/connection')
const router = require('./src/routes/routes')



//Routes
const paymentsRoutes = require('./src/routes/paymentsRoutes')

//Load environment
//require('./src/config/getEnv')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//paymentes route
app.use('/api', paymentsRoutes)

app.use(express.json())
app.use(router)

const port = process.env.PORT || 3333;

app.listen(port, function(err){
    if(err){ 
        console.error(err)
        return
    }
    console.log(`Servidor rodando na porta ${port}`)
})

app.get('/api/cadastros', (req, res)=>{
    res.send('formulario')

})

app.post('/cadastros', (req, res) =>{
    const { nome, email, telefone, cidade, igreja } = req.body
    console.log('Dados recebidos:', { nome, email, telefone, cidade, igreja })

    res.status(201).send('Cadastro realizado com sucesso')
})
