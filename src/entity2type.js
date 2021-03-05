const { entityField2gql } = require("./helpers/gqlConverters")
const { defaultConvention } = require("./helpers/stringCase")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2type(entity, options = {}) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  const convention = options?.convention || defaultConvention

  let name
  if (options?.customName) name = options.customName
  else name = convention(entity.name)

  let gql = ""
  gql += `type ${name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2type
