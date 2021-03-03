const { camelCase, upperFirst } = require('lodash')
const { entityField2gql } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2input(entity, isCamelCase = true, customName ) {
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

  let gql = `input ${name}Input {\n${entityField2gql(entity)}}`
  return gql
}

module.exports = entity2input
