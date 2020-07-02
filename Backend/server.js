const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ip = require("ip");



//import libs
const utils = require("./libs/utils")
console.log("")
console.log(utils.cabecalho() + "[Carregando Bibliotecas...]")

//var login = require("./routes/login");
console.log(utils.cabecalho() + "[Carregando Rotas...]")

const users = require("./routes/users");
const reuniao = require("./routes/reuniao");
const pautas = require("./routes/pauta");


console.log(utils.cabecalho() + "[Definindo Variaveis...]")

const port = 3000;
const app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', reuniao)
app.use('/api', users)
app.use('/api', pautas)

console.log(utils.cabecalho() + "[Definindo Rotas...]")

app.listen(port, () => {
    console.log(utils.cabecalho() + "[Servidor on-line \033[1;31m" + ip.address() + "\033[1;37m | Porta => \033[1;31m" + port + "\033[1;37m ]")
})

