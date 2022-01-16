import Joi from "joi";

export const CreateGroupSchema = Joi.object({
    
  name: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  destination: Joi.string().required(),
  description: Joi.string().required(),

});

export const UpdateGroupSchema = Joi.object({
  // TO DO
  groupId: Joi.number().positive().required(),
  name: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  destination: Joi.string().required(),
  description: Joi.string().required(),
});


