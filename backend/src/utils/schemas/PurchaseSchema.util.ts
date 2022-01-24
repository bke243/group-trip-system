import Joi from 'joi';

export const CreatePurchaseSchema = Joi.object({
    group_id: Joi.number().positive().required(),
    package_id: Joi.number().positive().required(),
    payment_details: Joi.object({
        card_number: Joi.string().length(16).required(),
        expiry_month: Joi.number().min(1).max(12).required(),
        expiry_year: Joi.number().min(Number(new Date().getFullYear().toString().substr(-2))).max(50).required(),
        cvc: Joi.string().length(3).required()
    }).required()
})