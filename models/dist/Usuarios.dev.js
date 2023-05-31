"use strict";

var Sequelize = require('sequelize');

var db = require('../config/db');

var Proyectos = require('./Proyectos');

var bcrypt = require('bcrypt-nodejs');

var Usuarios = db.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Agrega un Correo Valido'
      },
      notEmpty: {
        msg: 'El Email no Puede ir Vacio'
      }
    },
    unique: {
      args: true,
      msg: 'Usuario Ya Registrado'
    }
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El Password no Puede ir Vacio'
      }
    }
  }
}, {
  hooks: {
    beforeCreate: function beforeCreate(usuario) {
      usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
    }
  }
});
Usuarios.hasMany(Proyectos);
module.exports = Usuarios;