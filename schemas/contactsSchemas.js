import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.number().required(),
  phone: Joi.number().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.number(),
  phone: Joi.number(),
});