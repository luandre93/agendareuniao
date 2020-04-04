var Sequelize = require("sequelize");
var db = require("../database/db.js");

module.exports = db.sequelize.define(
    "_usuario",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        nome: {
            type: Sequelize.STRING,
        },
        senha: {
            type: Sequelize.STRING,
        },

        nivel: {
            type: Sequelize.INTEGER,

        },
        cancelado: {
            type: Sequelize.INTEGER,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)