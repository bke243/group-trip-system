import Joi from "joi";

export const AccountSingUpSchema = Joi.object({
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  telephone: Joi.string(),
  email: Joi.string().email().required(),
  birthDate: Joi.string(),
})

export const AccountLoginSchema =  Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
})
