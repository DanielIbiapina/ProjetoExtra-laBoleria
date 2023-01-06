import joi from "joi"

export const clientsSchema = joi.object({
    name: joi.required(),
    address: joi.required(),
    phone: joi.string().required().min(10).max(11)
})