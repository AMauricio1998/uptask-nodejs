const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo de autenticacion
const Usuarios = require('../models/Usuarios');

//Local-strategy - login con credenciales propias (usuario y password)
passport.use(
    new LocalStrategy(
        //por default passport espera usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { 
                        email, 
                        activo: 1
                    }
                });
                //Usuario existe pero password no coincide
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    });    
                }

                // email y password correcto
                return done(null, usuario);

            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                });
            }
        }
    )
)


// serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
})
// deserializar el usuario
passport.deserializeUser((usuario, callback) =>{ 
    callback(null, usuario);
})

module.exports = passport;