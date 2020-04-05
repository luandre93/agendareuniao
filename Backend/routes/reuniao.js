var express = require("express")
var router = express.Router()
var Reuniao = require("../model/Reuniao")


//get Alls usuarios

router.get("/users/reunioes", (req, res) => {

    Reuniao.findAll()
        .then(reuniao => {
            res.json(reuniao)
        })
        .catch(err => {
            res.send("error ao carregar... mysql! " + err)
        })
})

router.get("/users/reuniao/:id", (req, res) => {

    Reuniao.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(reuniao => {
            res.json(reuniao)
        })
        .catch((err) => {
            res.send(err)
        })
})

//delete

router.delete("/users/reuniao/:id", (req, res) => {
    Reuniao.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Usuario Deleteado!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


//create
router.post("/users/reuniao", (req, res) => {

    /*if (!req.body.id_usuario) {
        res.status(400)
        res.json({
            error: "Bad Data!"
        })
    } else {*/

    User.create(req.body).then(() => { res.send("Usuário Adicionado.") })
        .catch(err => { res.send("Error: " + err) })

})


//update

router.put("/user/:id", (req, res) => {
    if (!req.body.nome) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        User.update({
            nome: req.body.nome,
            senha: req.body.senha,
            nivel: req.body.nivel,
            cancelado: req.body.cancelado
        },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(() => {
                res.send("Usuario Atualizado!")
            })
            .error(err => res.send(err))
    }
})


module.exports = router