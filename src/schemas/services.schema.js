import Joi from "joi";


export const schemaServices = Joi.object({
	photo: Joi.string().required(),
	description: Joi.string().required(),
    price: Joi.integer().required(),
    activeState: Joi.boolean().required()
})