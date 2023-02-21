const Joi = require('joi');

// const id = Joi.string().uuid();
const id = Joi.string();
const name = Joi.string().min(3);
const age = Joi.number().integer();
const hobbies = Joi.array();

const createUserSchema = Joi.object({
  name: name.required(),
  age: age.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  age: age,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
