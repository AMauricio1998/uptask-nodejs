const Sequelize = require('sequelize')
const db =  require('../config/db')
const Proyectos = require('./Proyectos')
const bcrypt = require('bcrypt-nodejs')

const Usuarios = db.define('usuarios', {
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
            
            },
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        },
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {        
            notEmpty: {
                msg: 'El Password no Puede ir Vacio'
            } 
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        expiracion: Sequelize.DATE
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        },
    }
});

//Metodos personalizados
Usuarios.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;