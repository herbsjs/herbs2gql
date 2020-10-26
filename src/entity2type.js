const { camelCase, upperFirst } = require('lodash')
const { entityField2gql } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2type(entity) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  let gql = ""
  gql += `type ${upperFirst(camelCase(entity.name))} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2type
