"use strict";

var express = require('express');

var router = express.Router(); // IMportar express validator

var _require = require('express-validator/check'),
    body = _require.body; // Importar controllador


var proyectosController = require('../controllers/proyectosController');

var tareasController = require('../controllers/tareasController');

var usuariosController = require('../controllers/usuariosController');

module.exports = function () {
  router.get('/', proyectosController.proyectosHome);
  router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto', body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto); //Listar proyecto

  router.get('/proyectos/:url', proyectosController.proyectoPorUrl); //Actualizar el proyecto

  router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
  router.post('/nuevo-proyecto/:id', body('nombre').not().isEmpty().trim().escape(), proyectosController.actualizarProyecto);
  router["delete"]('/proyectos/:url', proyectosController.eliminarProyecto);
  router.post('/proyectos/:url', tareasController.agregarTarea); //actualizar tarea

  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea); //eliminar tarea

  router["delete"]('/tareas/:id', tareasController.eliminarTarea); //rutas para usuarios

  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta); //iniciar sesion

  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  return router;
};