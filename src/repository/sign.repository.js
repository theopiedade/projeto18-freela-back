import db from '../database/database.connection.js';

export async function getUsersByEmail (email) {
	return db.query('SELECT * FROM users WHERE "email" = $1', [email]);
}

export async function insertUsers (email, password, name, phone, city, type) {
	return db.query('INSERT INTO users (email, password, name, phone, city, type) VALUES ($1, $2, $3, $4, $5, $6);', 
    [email, password, name, phone, city, type]);
}

export async function insertSigns (userId, token, state) {
	return db.query('INSERT INTO signs (userid, token, state) VALUES ($1, $2, $3);', 
    [userId, token, state]);
}

export async function checkToken (token, id) {
    return db.query(`SELECT * FROM signs WHERE token = $1 AND userid = $2;`, [token, id]);
}