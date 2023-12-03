const db = require('../database/databaseconfig')

async function Book(req, res) {
    try {
        const { username, name, email, num, sede, date, time } = req.body;

        if (username && name && email && num && sede && date && time) {

            const cuposQuery = 'SELECT cupos_disp FROM sedes WHERE name = ?';
            const insertQuery = 'INSERT INTO bookings(username, name, email, num, sede, date, time) VALUES(?, ?, ?, ?, ?, ?, ?)';
            const updateCuposQuery = 'UPDATE sedes SET cupos_disp = cupos_disp - ? WHERE name = ?';

            db.query(cuposQuery, [sede], async (error, results) => {
                if (error) {
                    console.log('Error consultando los cupos: ', error);
                    res.send('Error interno al procesar la reserva.');
                    return res.end();
                }

                if (results.length > 0) {
                    const cupos = results[0].cupos_disp;
                    if (cupos < num) {
                        res.send('No hay cupos suficientes.');
                        return res.end();
                    }
                }

                db.query(insertQuery, [username, name, email, num, sede, date, time], (error, results) => {
                    if (results) {
                        console.log('Reservación creada en la BD.');
                        db.query(updateCuposQuery, [num, sede], (updateError, updateResults) => {
                            if (updateError) {
                                console.error('Error actualizando los cupos: ', updateError);
                                res.send('Error interno al procesar la reserva.');
                                return res.end();
                            }
                            console.log('Cupos actualizados correctamente.');
                            res.send('¡Tu reservación ha sido creada!');
                            return res.end();
                        });
                    } else {
                        res.send('No se pudo crear la reservación');
                        console.log('!***************!');
                        console.log('Error creando la reservación en la BD:');
                        console.log(error);
                        return res.end();
                    }
                });
            });
        } else {
            console.log('Datos vacíos.');
            res.send('Algunos datos obligatorios se encuentran vacíos.');
            res.end();
        }
    } catch (e) {
        console.log('Error en la función Book:', e);
        res.send('Error interno al procesar la reserva.');
        res.end();
    }
}

module.exports = Book;