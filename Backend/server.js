var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
//const morgan = require("morgan")

//var login = require("./routes/login");
var users = require("./routes/users");

//var dashboard = require("./routes/login");
var port = 3000;

var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api", users)

app.listen(port, () => {
    console.log("[ Servidor on-line ] [Porta => " + port + "]")
})