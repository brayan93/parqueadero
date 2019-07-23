const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

const db = require('../config/DB');

const Precio = db.define('precios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
    precio: Sequelize.INTEGER(7),
    descripcion: Sequelize.STRING
}, {
    hooks: {
        beforeCreate(precio) {
            const url = slug(precio.nombre).toLowerCase();
            precio.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Precio;