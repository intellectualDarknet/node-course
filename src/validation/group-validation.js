const Joi = require('joi')

function groupValidation (data) {
  const schema = Joi.object({
    name: Joi.string(),
    permissions: Joi.string()
  })

  return schema.validate(data)
}
module.exports = groupValidation
