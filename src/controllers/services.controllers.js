import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function getServices(req, res) {
    const { id } = req.params;

    const services = await db.query(`SELECT * FROM services WHERE active_state = true;`);
    if (services.rowCount <= 0) return res.sendStatus(404);

    const data = {
        id: id,
        shortUrl: checkUrl.rows[0].short,
        url: checkUrl.rows[0].url
    }

    return res.status(200).send(data);

}