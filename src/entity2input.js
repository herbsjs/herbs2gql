const { entityField2gql } = require("./helpers/gqlConverters")
const { defaultConvention } = require("./helpers/stringCase")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2input(entity, options = {}) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  const convention = options?.convention?.inputNameRule || defaultConvention

  let name
  if (options?.inputName) name = options.inputName
  else name = convention(entity.name)

  let gql = `input ${name}Input {\n${entityField2gql(entity)}}`
  return gql
}

module.exports = entity2input
