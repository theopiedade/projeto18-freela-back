import { getActiveServices, createMyServices, listMyServices } from '../repository/services.repository.js';
import { checkToken } from '../repository/sign.repository.js';

export async function getServices(req, res) {
    const services = await getActiveServices();
    if (services.rowCount <= 0) return res.status(404).send("Sem serviços disponíveis");

    return res.status(200).send(services.rows);

}

export async function getMyServices(req, res) {
    const { id } = req.params
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const checkUserToken = await checkToken(token, id);
    if (checkUserToken.rowCount <= 0) return res.status(401).send("Usuário inválido ou não autenticado");

    const services = await listMyServices(id);
    if (services.rowCount <= 0) return res.status(404).send("Sem serviços disponíveis");

    return res.status(200).send(services.rows);

}


export async function createServices(req, res) {
    const { id } = req.params;
    const { photo, description, price, active_state} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const checkUserToken = await checkToken(token, id);
    if (checkUserToken.rowCount <= 0) return res.status(401).send("Usuário inválido ou não autenticado");

    try{

        await createMyServices(photo, description, price, active_state, id);
        return res.status(201).send("Serviço cadastrado com sucesso");

    }catch(err){
        return res.status(500).send(err.message);
    }


}
