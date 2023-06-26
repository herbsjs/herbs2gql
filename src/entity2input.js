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
  const hasIDs = (entity) => entity.schema.fields.some((field) => field.options?.isId)
  const convention = options?.convention?.inputNameRule || defaultConvention
  const name = options?.inputName || convention(entity.name)
  let gql = `input ${name}Input {\n${entityField2gql(entity, 'input', entityField2gql.ids.excludes)}}`
  if (hasIDs(entity))
    gql += `\ninput ${name}IDsInput {\n${entityField2gql(entity, 'IDsInput', entityField2gql.ids.only)}}`

  return gql
}



module.exports = entity2input
