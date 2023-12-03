const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	database: process.env.DB_SCHEMA,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD
});

// Prueba que la conexión funcione a MySQL funcione
db.connect(function (err) {
	if (err) throw err;
	console.log('**************************');
	console.log("Conectado a la base de datos.");
});

module.exports = db;