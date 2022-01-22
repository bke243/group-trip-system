import Joi from "joi";

export const UserMessageSchema = Joi.object({
  content: Joi.string().required(),

})

