import Joi from "joi";

export const AddGroupUserSchema = Joi.object({
    
  email: Joi.string().email().required(),
  groupId: Joi.number().positive().required()

});




