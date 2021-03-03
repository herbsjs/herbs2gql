const { camelCase, upperFirst } = require('lodash')
const { entityField2gql } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2type(entity, isCamelCase = true, customName) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  let name
  if (customName) name = customName
  else if (!isCamelCase) name = entity.name
  else name = upperFirst(camelCase(entity.name))

  let gql = ""
  gql += `type ${name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2type
