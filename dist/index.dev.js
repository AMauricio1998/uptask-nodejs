"use strict";

var express = require('express');

var routes = require('./routes');

var path = require('path');

var bodyParser = require('body-parser');

var flash = require('connect-flash');

var session = require('express-session');

var cookieParser = require('cookie-parser'); //helpers con algunas funciones


var helpers = require('./helpers'); // Crear conexioin a db


var db = require('./config/db'); //Importar el modelo


require('./models/Proyectos');

require('./models/Tareas');

require('./models/Usuarios');

db.sync().then(function () {
  return console.log('Conectado');
})["catch"](function (error) {
  return console.log(error);
}); //Crear app express

var app = express(); //Cargar archivos estaticos

app.use(express["static"]('public')); //Habilitar Pug

app.set('view engine', 'pug'); //Habilitar bodyParser para leer datos del formulario

app.use(bodyParser.urlencoded({
  extended: true
})); //Añadir la carpeta de las vistas

app.set('views', path.join(__dirname, './views')); //Agregar flash messages

app.use(flash()); //sesiones nos permiten navegar entre distintas paginas sin volver a iniciar sesion

app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
})); //pasar vardump a la aplicacion

app.use(function (req, res, next) {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  next();
}); //ruta para el home

app.use('/', routes()); //Puerto en el que va a estar escuchando

app.listen(3000);