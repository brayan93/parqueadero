var express = require('express');
var router = express.Router();

const Registro = require('../model/Registro');

router.get('/form', (req, res, next) => {
    res.render('forms/salidaForm', {
        title: 'Salida'
    });
});

router.get('/list', async (req, res, next) => {
    const registros = await Registro.findAll({
        where: {
            estado: 0
        }
    });
    if (registros) {
        res.render('lists/registrosList', {
            title: 'Registros de entrada',
            registros
        });
    } else {
        res.redirect('/');
    }
});

router.post('/form', async (req, res, next) => {
    const { placa } = req.body;
    const d = new Date();
    const resultado = await Registro.findAll({
        where: {
            placa,
            estado: 0,
        }
    });
    if (!resultado) {
        res.redirect('/salida/form');
    } else {
        res.render('forms/salidaForm', {
            registros: resultado
        });
    }
});

module.exports = router;