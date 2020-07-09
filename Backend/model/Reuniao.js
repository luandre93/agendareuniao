var Sequelize = require("sequelize");
var db = require("../database/db.js");

module.exports = db.sequelize.define(
    "_reuniao",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            references: {         // User referenciado aa Reunião
                model: '_usuario',
                key: 'id',
            },
        },
        titulo: {
            type: Sequelize.STRING,
        },
        categoria: {
            type: Sequelize.STRING,
        },

        localizacao: {
            type: Sequelize.STRING,
        },

        data: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        cancelada: {
            type: Sequelize.BOOLEAN,
        },
        iniciada: {
            type: Sequelize.BOOLEAN,
        },
        hora_inicial: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        hora_final: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cor: {
            type: Sequelize.STRING,
        },

    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)