const db = require('../database/databaseconfig')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function Registro(req, res){
    try {
        const {username, email, password} = req.body;

		// Generar salt (valor aleatorio) para bcrypt
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
			  return res.status(500).send('Error al generar el salt para la contraseña');
			}
		
			// Hash de la contraseña con el salt generado
			bcrypt.hash(password, salt, (err, hash) => {
			  if (err) {
				return res.status(500).send('Error al generar el hash para la contraseña');
			  }
	if (username && password) {
		db.query('INSERT INTO users(username, email, hash) VALUES(?, ?, ?)', [username, email, hash], (error, results) => {
			if (error) throw error;

			if (results) {
				res.send(true);
				console.log('Usuario creado exitosamente.');
			}
			else {
				res.send('No se pudo crear el usuario.');
				console.log('No se pudo crear el usuario, error de la base de datos.');
			}
			res.end();
		});
	}
	else {
		res.send('Por favor ingrese el usuario y la clave para el nuevo usuario.');
		res.end();
	}
	})
})
        
    } catch (error) {
        
    }
}

module.exports=Registro;