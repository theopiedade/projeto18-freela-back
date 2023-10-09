import Joi from "joi";


export const servicesSchema = Joi.object({
	photo: Joi.string().required(),
	description: Joi.string().required(),
    price: Joi.number().integer().required(),
    active_state: Joi.boolean().required(),
    userid: Joi.number().integer().required()
})