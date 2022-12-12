const Joi = require('joi')

function userValidation (data) {
  const schema = Joi.object({
    login: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(5).max(15).pattern(/(?=.*[0-9])(?=.*[a-z])/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required(),
    createdAt: Joi.string(),
    updatedAt: Joi.string()
  })

  return schema.validate(data)
}
module.exports = userValidation
