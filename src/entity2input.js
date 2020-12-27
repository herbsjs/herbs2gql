const { camelCase, upperFirst } = require('lodash')
const { entityField2gql } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { entityValidator } = require('./herbsValidator')

function entity2input(entity) {
  const validation = entityValidator(entity)
  if (!checker.isEmpty(validation)) {
    const error = Error('InvalidEntity')
    error.invalidArgs = validation
    throw error
  }

  let gql = `input ${upperFirst(camelCase(entity.name))}Input {\n${entityField2gql(entity)}}`
  return gql
}

module.exports = entity2input
