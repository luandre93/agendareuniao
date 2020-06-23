var Sequelize = require("sequelize");
var db = require("../database/db.js");

module.exports = db.sequelize.define(
    "_pauta",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_reuniao: {
            type: Sequelize.INTEGER,
            references: {                 //  reuniao referenciada aa pauta
                model: '_reuniao',
                key: 'id',
            },
        },
        pauta: {
            type: Sequelize.STRING,
        },
        horario: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        comentario: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)