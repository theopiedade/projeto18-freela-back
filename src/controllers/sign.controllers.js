import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { email, password, confirmPassword, name, phone, city, type } = req.body;

    const checkEmail = await db.query(`SELECT * FROM users WHERE "email" = $1;`, [email]);
    if (checkEmail.rowCount > 0) return res.status(409).send("Email já cadastrado");
    if (password !== confirmPassword) return res.status(422).send("Senhas e confirmação não conferem");

    const passwordCrypt = bcrypt.hashSync(password, 10);

    try{

        await db.query(`INSERT INTO users (email, password, name, phone, city, type) VALUES ($1, $2, $3, $4, $5, $6);`,
        [email, passwordCrypt, name, phone, city, type]);


        return res.status(201).send("Usuário cadastrado com sucesso");

    }catch(err){
        return res.status(500).send(err.message);
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body;

    const checkUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
    if (checkUser.rowCount <= 0) return res.status(401).send("Email não cadastrado");

    const passwordCheck = bcrypt.compareSync(password, checkUser.rows[0].password);
    if (!passwordCheck) return res.status(401).send("Senha incorreta");

    const token = uuid();
    const data = {
        token: token
      }

    const userId = checkUser.rows[0].id;
    const state = true;

    try{

        await db.query(`INSERT INTO signs (userid, token, state) VALUES ($1, $2, $3);`,
        [userId, token, state]);
     
       
        return res.status(200).send(data);

    }catch(err){
        return res.status(500).send(err.message);
    }

}