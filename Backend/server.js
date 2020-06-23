var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
//const morgan = require("morgan")

//var login = require("./routes/login");
const users = require("./routes/users");
const reuniao = require("./routes/reuniao");
const pautas = require("./routes/pauta");

//var dashboard = require("./routes/login");
const port = 3000;

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', reuniao)
app.use('/api', users)
app.use('/api', pautas)

app.listen(port, () => {
    console.log("[ Servidor on-line ] [Porta => " + port + "]")
})