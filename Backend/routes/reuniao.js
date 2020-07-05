const express = require("express")
const router = express.Router()
const Reuniao = require("../model/Reuniao")
const utils = require("../libs/utils")

//console.log(utils.cabecalho() + "[Ação: Acessando Reuniao] [ID: " + reuniao.id + "] [Titulo: " + reuniao.titulo + "] [Data: " + reuniao.data + "]")

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
            id: req.params.id,

        },

    })
        .then(reuniao => {
            res.json(reuniao)

        })
        .catch((err) => {
            res.send(err)
        })
})

// filtrar por id_usuario

router.get("/users/reunioes_id_usuario/:id_usuario", (req, res) => {

    Reuniao.findAll({
        where: {
            id_usuario: req.params.id_usuario,
        },

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
            res.send("Reuniao Deletado!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


//create
router.post("/users/reuniao", (req, res) => {

    Reuniao.create(req.body).then((reuniao) => {
        res.send("Reunião Adicionado.")

    })
        .catch(err => {
            res.send("Error: " + err)
        })
})


//update

router.put("/users/reuniao/:id", (req, res) => {
    if (!req.body.titulo) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        Reuniao.update({
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            localizacao: req.body.localizacao,
            data: req.body.data,
            cancelada: req.body.cancelada,
            hora_inicial: req.body.hora_inicial,
            hora_final: req.body.hora_final,
            iniciada: req.body.iniciada
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