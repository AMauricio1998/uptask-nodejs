const express = require("express");
const router = express.Router();

// IMportar express validator
const { body } = require("express-validator/check");

// Importar controllador
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
  router.get(
    "/",
    authController.usurioAutenticado,
    proyectosController.proyectosHome
  );
  router.get(
    "/nuevo-proyecto",
    authController.usurioAutenticado,
    proyectosController.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    authController.usurioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  //Listar proyecto
  router.get(
    "/proyectos/:url",
    authController.usurioAutenticado,
    proyectosController.proyectoPorUrl
  );

  //Actualizar el proyecto
  router.get(
    "/proyecto/editar/:id",
    authController.usurioAutenticado,
    proyectosController.formularioEditar
  );
  router.post(
    "/nuevo-proyecto/:id",
    authController.usurioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );
  router.delete(
    "/proyectos/:url",
    authController.usurioAutenticado,
    proyectosController.eliminarProyecto
  );
  router.post(
    "/proyectos/:url",
    authController.usurioAutenticado,
    tareasController.agregarTarea
  );

  //actualizar tarea
  router.patch(
    "/tareas/:id",
    authController.usurioAutenticado,
    tareasController.cambiarEstadoTarea
  );
  //eliminar tarea
  router.delete(
    "/tareas/:id",
    authController.usurioAutenticado,
    tareasController.eliminarTarea
  );

  //rutas para usuarios
  router.get("/crear-cuenta", usuariosController.formCrearCuenta);
  router.post("/crear-cuenta", usuariosController.crearCuenta);
  router.get('/confirmar/:correo', usuariosController.confirmarCuenta)

  //iniciar sesion
  router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
  router.post("/iniciar-sesion", authController.autenticarUsuario);

  router.get('/cerrar-sesion', authController.cerrarSesion);
  
  //reestablecer contraseña 
  router.get("/reestablecer", usuariosController.formReestablecerPassword)
  router.post("/reestablecer", authController.enviarToken)
  router.get('/reestablecer/:token', authController.validarToken)
  router.post('/reestablecer/:token', authController.actualizarPassword)

  return router;
};
