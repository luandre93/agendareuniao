var express = require("express")
var router = express.Router()

var User = require("../model/Users")


//get Alls usuarios

router.get("/users", (req, res) => {

    User.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error ao carregar... mysql! " + err)
        })
})

//create
router.post("/user", (req, res) => {

    if (!req.body.nome) {
        res.status(400)
        res.json({
            error: "Bad Data!"
        })
    } else {
        User.create(req.body).then(() => { res.send("Usuário Adicionado.") })
            .catch(err => { res.send("Error: " + err) })
    }

})

//delete

router.delete("/user/:id", (req, res) => {
    User.destroy({
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

//update

router.put("/user/:id", (req, res) => {
    if (!req.body.nome) {
        res.status(400)
        res.json({
            error: "Bad Data"
        })
    } else {
        User.update(
            {
                nome: req.body.nome,
                senha: req.body.senha,
                nivel: req.body.nivel,
                cancelado: req.body.cancelado
            },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.send("Usuario Atualizado!")
            }).error(err => res.send(err))
    }
})


module.exports = router