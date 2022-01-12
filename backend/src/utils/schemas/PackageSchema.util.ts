import Joi from "joi";

export const CreatePackageSchema = Joi.object({
  name: Joi.string().required(),
  activities: Joi.array().items(Joi.string()).min(1).required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  count: Joi.number().positive().required(),
  maxPersons: Joi.number().positive().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  streetName: Joi.string().required(),
  zipCode: Joi.string().allow(null),
  state: Joi.string().allow(null),
})

export const UpdatePackageSchema = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().required(),
  activities: Joi.array().items(Joi.string()).min(1).required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  created: Joi.date().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  count: Joi.number().positive().required(),
  maxPersons: Joi.number().positive().required(),
  adminId: Joi.number().positive().required(),
  locationId: Joi.number().positive().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  streetName: Joi.string().required(),
  zipCode: Joi.string(),
  state: Joi.string(),
});



