import Joi from 'joi';

export const CreateFeedbackSchema = Joi.object({
    group_id: Joi.number().positive().required(),
    package_id: Joi.number().positive().required(),
    feedback: Joi.string().min(1).required()    
})