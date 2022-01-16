import Joi from "joi";

export const MessageSchema = Joi.object({
  content: Joi.string().required(),
  receiverId: Joi.number().positive(),
})

