import Joi from 'joi'

export default function userValidation (data) {
  const schema = Joi.object({
    id: Joi.string().min(2).max(255).required(),
    login: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(5).max(15).pattern(/(?=.*[0-9])(?=.*[a-z])/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
  })

  return schema.validate(data)
}
