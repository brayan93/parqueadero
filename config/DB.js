const Sequelize = require('sequelize');

const sequelize = new Sequelize('parqueadero', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;