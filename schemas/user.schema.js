const Joi = require("joi");

// const id = Joi.string().uuid();
const id = Joi.string().min(5);
const balance = Joi.string();
const picture = Joi.string();
const age = Joi.number().integer();
const eyeColor = Joi.string();
const name = Joi.object({
  first: Joi.string().min(3),
  last: Joi.string().min(3)
});
const company = Joi.string();
const email = Joi.string().email().min(5);
const password = Joi.string().min(8);
const phone = Joi.string().min(10);
const address = Joi.string();
const role = Joi.string().min(4);

const allFields = {
  balance,
  picture,
  age,
  eyeColor,
  name,
  company,
  email,
  password,
  phone,
  address
};

const createUserSchema = Joi.object({
  ...allFields,
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({ ...allFields });

const getUserSchema = Joi.object({
  id: id.required()
});

const logInSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  logInSchema
};
