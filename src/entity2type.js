const { camelCase, upperFirst } = require('lodash')
const { entityField2gql, EnumConventions } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2type(entity, options = undefined) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  const convention = EnumConventions[options?.convention]

  let name
  if (options?.customName) name = options.customName
  else if (convention) name = convention(entity.name)
  else name = upperFirst(camelCase(entity.name))

  let gql = ""
  gql += `type ${name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2type
