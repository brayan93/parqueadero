var express = require('express');
var router = express.Router();

const Precio = require('../model/Precio');

router.get('/', async (req, res, next) => {
    const registros = await Precio.findAll();
    if (registros) {
        res.render('lists/precioList', {
            title: 'Precios',
            registros
        });
    }
});

router.get('/form', (req, res, next) => {
    res.render('forms/precioForm', {
        title: 'Precios'
    });
});

router.get('/editar/:url', async (req, res, next) => {
    const { url } = req.params;
    const precio = await Precio.findOne({
        where: {
            url
        }
    });
    if (precio) {
        res.render('forms/editarPrecio', {
            precio 
        });
    } else {
        res.redirect('/precio');
    }
});

router.post('/editar/:url', async (req, res, next) => {
    const { url } = req.params;
    const precioF = req.body.precio;
    const precio = await Precio.findOne({
        where: {
            url
        }
    });
    if (precio) {
        await Precio.update({
            precio: precioF
        }, {
            where: {
                id: precio.id
            }
        });
    }
    res.redirect('/precio');
});

router.post('/form', async (req, res, next) => {
    const { nombre, precio, descripcion } = req.body;
    const resp = await Precio.create({
        nombre, precio, descripcion
    });
    if (resp) {
        res.redirect('/precio');
    }
});

module.exports = router;