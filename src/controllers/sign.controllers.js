import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { getUsersByEmail, insertSigns, insertUsers } from '../repository/sign.repository.js';

export async function signUp(req, res) {
    const { email, password, confirmPassword, name, phone, city, type } = req.body;

    const checkEmail = await getUsersByEmail(email);
    if (checkEmail.rowCount > 0) return res.status(409).send("Email já cadastrado");
    if (password !== confirmPassword) return res.status(422).send("Senhas e confirmação não conferem");

    const passwordCrypt = bcrypt.hashSync(password, 10);

    try{

        await insertUsers(email, passwordCrypt, name, phone, city, type);
        return res.status(201).send("Usuário cadastrado com sucesso");

    }catch(err){
        return res.status(500).send(err.message);
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body;

    const checkUser = await getUsersByEmail(email);
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

        await insertSigns(userId, token, state);
     
       
        return res.status(200).send(data);

    }catch(err){
        return res.status(500).send(err.message);
    }

}