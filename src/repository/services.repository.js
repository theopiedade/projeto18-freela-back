import db from '../database/database.connection.js';

export async function getActiveServices() {
    return db.query(`SELECT JSON_BUILD_OBJECT('id', id, 'photo', photo, 'description', description, 'price', price) AS "json" 
    FROM services WHERE active_state = true;`);
}

export async function listMyServices(id) {
	return db.query(`SELECT JSON_BUILD_OBJECT('id', id, 'photo', photo, 'description', description, 'price', price, 'active_state', active_state) AS "json" 
    FROM services WHERE userid = $1;`, [id]);
}

export async function createMyServices(photo, description, price, active_state, userid) {
    return db.query('INSERT INTO services (photo, description, price, active_state, userid) VALUES ($1, $2, $3, $4, $5);', 
    [photo, description, price, active_state, userid]);
}