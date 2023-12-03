const db = require('../database/databaseconfig')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'josemgarcesm0708@gmail.com',
      pass: 'Jmgm.0708'
    }
  });

async function olvidoContraseña(req, res){
    try {
        const { email } = req.body;
    
        // Verifica que el correo exista en tu base de datos
        if (email) {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
                
                if (error) throw error;
    console.log(results.length)
                if (results.length != null) {
                     // Genera un token único
                    const token = jwt.sign({ email }, 'tu_secreto', { expiresIn: '1h' });

                    // Crea el enlace de recuperación con el token
                    const enlaceRecuperacion = `http://tuapp.com/recuperar-contrasena/${token}`;

                    // Configura el mensaje de correo
                    const mensaje = {
                        from: 'josemgarcesm0708@gmail.com',
                        to: email,
                        subject: 'Recuperación de Contraseña',
                        text: `Para recuperar tu contraseña, haz clic en el siguiente enlace: ${enlaceRecuperacion}`
                    };

                    // Envía el correo
                    try {
                        await transporter.sendMail(mensaje);
                        res.send(true);
                    } catch (error) {
                        console.error(error);
                        res.send(false);
                    }
                }
                else {
                    res.send(false);
                }
            });
        }   
    } catch (error) {
        res.send(error);
    }

}

module.exports= olvidoContraseña;