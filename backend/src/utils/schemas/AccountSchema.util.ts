import Joi from "joi";

const AccountSchema = Joi.object({
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  telephone: Joi.string().required(),
  email: Joi.string().email().required(),
})

export default AccountSchema;