const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const engines = require('consolidate')
const path = require('path')

require('./src/config/getEnv')();
//console.log(`Porta configurada: ${process.env.API_PORT}`);

const knex =  require('./src/database/connection')
const router = require('./src/routes/routes')

//Routes
const paymentsRoutes = require('./src/routes/paymentsRoutes')

//Load environment
require('./src/config/getEnv')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//for render views
app.engine("ejs", engines.ejs)
app.set("views", path.join(__dirname, './src/views'))
app.set("view engine", "ejs")

//paymentes route
app.use('/payments', paymentsRoutes)

app.use(express.json())
app.use(router)

app.listen(process.env.API_PORT, function(err){
    if(err){ 
        console.error(err)
        return
    }
    console.log(`Servidor rodando na porta ${process.env.API_PORT}`)
})



app.get('/api/cadastros', (req, res)=>{
    res.send('formulario')

})

app.post('/cadastros', (req, res) =>{
    const { nome, email, telefone, cidade, igreja } = req.body
    console.log('Dados recebidos:', { nome, email, telefone, cidade, igreja })

    res.status(201).send('Cadastro realizado com sucesso')
})


