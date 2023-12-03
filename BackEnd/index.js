// --- IMPORTS ---
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const db = require('./database/databaseconfig')
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const routes = require('./routes/routes');
app.use('/', routes);

// Ruta de ejemplo
app.get('/', (req, res) => {
	res.send('¡Hola, mundo!');
});

app.get('/inicio', (req, res) => {
	res.sendFile(path.join(__dirname, './views/register.html'));
});

// --- SERVER ---
// Corre el servidor por el puerto especificado en la variable de entorno
const port = process.env.PORT || 4040;
app.listen(port, () => {
	console.log(`Servidor corriendo en el puerto: ${port}`);
});

// --- MIDDLEWARES DE SESIÓN ---
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));


// Usa la carpeta 'public' como carpeta de plantillas por defecto
app.use(express.static(path.join(__dirname, 'public')));

// --- DB CONNECTION ---
// Establece las credenciales de conexión a la base de datos MySQL


