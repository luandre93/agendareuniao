const express = require("express")
const router = express.Router()
const User = require("../model/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
process.env.SECRET_KEY = 'secret'


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

router.get("/user/:id", (req, res) => {

    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(users => {
            res.json(users)
        })
        .catch((err) => {
            res.send(err)
        })
})

//delete

router.delete("/user/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.send("Usuario Deletado!")
        })
        .catch(err => {
            res.send("error: " + err)
        })
})



router.post("/registro", (req, res) => {

    const userData = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        nivel: req.body.nivel,
        cancelado: req.body.cancelado
    }

    User.findOne({
        where: {
            email: req.body.email
        }

    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.senha, 10, (err, hash) => {
                    userData.senha = hash
                    User.create(userData).then(user => {
                        res.json({
                            status: user.email + ' registrado!'
                        })
                    }).catch(err => {
                        res.send('error: ' + err)
                    })
                })
            } else {
                res.json({ error: 'Usuario ja existe no banco de dados!' })
            }
        }).catch(err => {
            res.send('error' + err)
        })

})

router.post("/user/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.senha, user.senha)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.status(400).json({ error: 'Usuário ou senha não existe no Banco de dados!' })
                }

            }

        })
        .catch(err => {
            res.status(400).json({ error: err })
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
        User.create(req.body).then(() => {
            res.send("Usuário Adicionado.")
        })
            .catch(err => {
                res.send("Error: " + err)
            })
    }
})

//autorização
router.get('/user/login/app', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    User.findOne({
        where: {
            id: decoded.id
        }
    }).then(user => {
        if (user) {
            res.json(user)
        } else {
            res.send('Usuario não existe!')
        }
    }).catch(err => {
        res.send('Erro ' + err)
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