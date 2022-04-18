const { entityField2gql } = require("./helpers/gqlConverters")
const { defaultConvention } = require("./helpers/stringCase")
const { checker } = require('@herbsjs/suma')
const { entityValidator } = require('./herbsValidator')

function entity2input(entity, options = {}) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  let convention = defaultConvention
  if(options && options.convention && options.convention.inputNameRule)
    convention = options.convention.inputNameRule 

  let name
  if (options && options.inputName) name = options.inputName
  else name = convention(entity.name)

  let gql = `input ${name}Input {\n${entityField2gql(entity, 'input')}}`
  return gql
}

module.exports = entity2input
