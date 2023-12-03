const db = require('../database/databaseconfig')

async function obtenerReservas(req, res) {
    try {
        const { username } = req.body;

        if (username && username != 'admin') {
            db.query('SELECT * FROM bookings WHERE username = ?', [username], async (error, results) => {
                if (error) throw error;

                if (results.length > 0) {
                    res.send(results);
                }
            });
        }
        if (username && username == 'admin') {
            db.query('SELECT * FROM bookings WHERE username <> ?  ', [username], async (error, results) => {
                if (error) throw error;

                if (results.length > 0) {
                    res.send(results);
                }
            });
        }

    } catch (error) {
        res.send(error);
        console.log(error);
    }



}

module.exports = obtenerReservas;