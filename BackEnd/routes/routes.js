const express = require('express');
const router = express.Router();

const controllerIniciarSesion = require('../controllers/iniciarSesionController');
const controllerRegister = require('../controllers/registroController');
const controllerReservar = require('../controllers/reservarController');
const controllerObetenerUsuario = require('../controllers/obtenerusuarioController');
const constrollerObtenerReservas = require('../controllers/obtenerreservasController');
const controllerOlvidoContraseña = require('../controllers/forgotPwdController')

router.post('/iniciarsesion', controllerIniciarSesion);
router.post('/register', controllerRegister);
router.post('/reservar', controllerReservar);
router.post('/obtenerreservas', constrollerObtenerReservas);
router.post('/obtenerusuario', controllerObetenerUsuario.obtenerUsuario);
router.post('/obtenerusuarios', controllerObetenerUsuario.obtenerUsuarios);
router.post('/olvidocontrasena', controllerOlvidoContraseña);


module.exports = router;