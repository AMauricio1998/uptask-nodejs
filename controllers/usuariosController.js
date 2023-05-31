const Usuarios = require("../models/Usuarios")
const { enviarToken } = require("./authController")
const enviarEmail = require('../handler/email')

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuente', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePagina: 'Inicia Sesion en Uptask',
        error
    })
}

exports.crearCuenta = async (req, res) => {
    //Leer datos
    const {email, password} = req.body

    try {
        await Usuarios.create({
            email,
            password 
         })

        // crear url para confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // crear  ek objeto usuario
         const usuario = {
            email
         }

        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta uptask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        })

        //reedirigir al usuario
        req.flash('correcto', 'Enviamos un correo confirma tu cuenta')
        res.redirect('/iniciar-sesion')
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));

        res.render('crearCuente', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en Uptask',
            email,
            password
        })
    }   
}

exports.formReestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu Contraseña'
    })
}

exports.confirmarCuenta = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    // sin no existe
    if (!usuario) {
        req.flash('error', 'No valido');
        res.redirect('/crear-cuenta')
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta activada correctamente');
    res.redirect('/iniciar-sesion')
}