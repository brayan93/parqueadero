var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registroRouter = require('./routes/registro');
var salidaRouter = require('./routes/salida');
var precioRouter = require('./routes/precio');

const sequelize = require('./config/DB');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos
const db = require('./config/DB');

// Modelos
require('./model/Registro');
require('./model/Precio');

db.sync()
    .then(() => {
        console.log('Conexion con la base de datos con exito!');
    })
    .catch((err) => {
        console.log('Ocurrio un error al conectar con la base de datos :(');
    })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registro', registroRouter);
app.use('/salida', salidaRouter);
app.use('/precio', precioRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;