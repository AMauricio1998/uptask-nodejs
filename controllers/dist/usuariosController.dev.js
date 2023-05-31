"use strict";

var Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = function (req, res) {
  res.render('crearCuente', {
    nombrePagina: 'Crear Cuenta en Uptask'
  });
};

exports.formIniciarSesion = function (req, res) {
  res.render('iniciarSesion', {
    nombrePagina: 'Inicia Sesion en Uptask'
  });
};

exports.crearCuenta = function _callee(req, res) {
  var _req$body, email, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //Leer datos
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Usuarios.create({
            email: email,
            password: password
          }));

        case 4:
          res.redirect('/iniciar-sesion');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          req.flash('error', _context.t0.errors.map(function (error) {
            return error.message;
          }));
          res.render('crearCuente', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en Uptask',
            email: email,
            password: password
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};