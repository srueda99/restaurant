const db = require('../database/databaseconfig')
const jwt = require('jsonwebtoken');

async function obtenerUsuario(req , res){
    try {
        const {token} = req.body;
              
        if (!token) {
            return res.send({ message: 'No hay token' });
          }
          jwt.verify(token, 'clave_secreta', (err, decoded) => {
            if (err) {
              return res.send({ message: 'Invalid token' });
            }
            
            username = decoded.usern;
            db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {

                if (error) throw error;

                if (results.length > 0) {
                let usuario = {

                  username: results[0].username,
                  hashedPassword: results[0].hash, 
                };
                res.send(usuario);
            }
            });
          });
        
    } catch (error) {
        
    }

}

async function obtenerUsuarios(req, res){
  try {
    const {username} = req.body;
    console.log('hola')

        db.query('SELECT * FROM users WHERE username <> ?', [username], async (error, results) => {

            if (error) throw error;

            if (results.length > 0) {
            res.send(results);
            }
        });
    
} catch (error) {
    
}

}

module.exports={obtenerUsuario, obtenerUsuarios};
