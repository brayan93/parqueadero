const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

const db = require('../config/DB');

const Registro = db.define('registros', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    placa: Sequelize.STRING,
    url: Sequelize.STRING,
    horaEntrada: {
        type: Sequelize.DATE,
    },
    estado: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    }
}, {
    hooks: {
        beforeCreate(registro) {
            const url = slug(registro.placa).toLowerCase();
            registro.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Registro;