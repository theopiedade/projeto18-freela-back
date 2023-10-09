import db from '../database/database.connection.js';

export async function getActiveServices() {
	return db.query('SELECT * FROM services WHERE active_state = true;');
}

export async function listMyServices(id) {
	return db.query('SELECT * FROM services WHERE id = $1;',[id]);
}