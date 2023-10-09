import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { getActiveServices } from '../repository/services.repository.js';

export async function getServices(req, res) {

    const services = await getActiveServices();
    if (services.rowCount <= 0) return res.status(404).send("Sem serviços disponíveis");

    return res.status(200).send(data);

}

export async function getMyServices(req, res) {

    const services = await listMyServices();
    if (services.rowCount <= 0) return res.status(404).send("Sem serviços disponíveis");

    return res.status(200).send(services.rows);

}