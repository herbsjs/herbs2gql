const { entityField2gql } = require("./helpers/gqlConverters")
const { defaultConvention } = require("./helpers/stringCase")
const { checker } = require('@herbsjs/suma')
const { entityValidator } = require('./herbsValidator')

function entity2type(entity, options = {}) {
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

  let gql = ""
  gql += `type ${name} {\n`
  gql += entityField2gql(entity, 'type')
  gql += "}"
  return gql
}

module.exports = entity2type
