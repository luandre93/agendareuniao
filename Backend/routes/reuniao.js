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
            res.send("erro ao carregar... Banco de dados! " + err)
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
            res.send("Reuniao Deleteado!")
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

    Reuniao.create(req.body).then(() => { res.send("Reunião Adicionado.") })
        .catch(err => { res.send("Error: " + err) })

})


//update

router.put("/users/reuniao/:id", (req, res) => {
    if (!req.body.titulo) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        User.update({
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            localizacao: req.body.localizacao,
            data: req.body.data,
            cancelada: req.body.cancelada,
            hora_inicial: req.body.hora_inicial,
            hora_final: req.body.hora_final
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