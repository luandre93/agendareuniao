const express = require("express")
const router = express.Router()
const Pauta = require("../model/Pautas")


router.get("/users/reunioes/pautas", (req, res) => {

    Pauta.findAll()
        .then(pauta => {
            res.json(pauta)
        })
        .catch(err => {
            res.send("erro ao carregar... Banco de dados! " + err)
        })
})

router.get("/users/reuniao/pauta/:id", (req, res) => {

    Pauta.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(pauta => {
            res.json(pauta)

        })
        .catch((err) => {
            res.send(err)
        })
})



router.get("/users/reuniao/pauta_id_reuniao/:id_reuniao", (req, res) => {

    Pauta.findAll({
        where: {
            id_reuniao: req.params.id_reuniao,
        },

    })
        .then(pauta => {
            res.json(pauta)

        })
        .catch((err) => {
            res.send(err)
        })
})

//delete

router.delete("/users/reuniao/pauta/:id", (req, res) => {
    Pauta.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Pauta Deletado!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})


//create
router.post("/users/reuniao/pauta", (req, res) => {
    Pauta.create(req.body)
        .then(() => {
            res.send("Pauta Adicionada.")
        })
        .catch(err => {
            res.send("Error: " + err)
        })

})


//update

router.put("/users/reuniao/pauta/:id", (req, res) => {
    if (!req.body.pauta) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        Pauta.update({
            pauta: req.body.pauta,
            horario: req.body.horario,
            comentario: req.body.comentario
        },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(() => {
                res.send("Pauta Atualizada!")
            })
            .error(err => res.send(err))
    }
})

router.put("/users/reuniao/pauta_comentario/:id", (req, res) => {
    if (!req.body.comentario) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        Pauta.update({
            horario: req.body.horario,
            comentario: req.body.comentario
        },
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(() => {
                res.send("Comentario Atualizada!")
            })
            .error(err => res.send(err))
    }
})


module.exports = router