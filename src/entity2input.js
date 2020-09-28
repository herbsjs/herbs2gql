const { entityField2gql } = require("./helpers/gqlConverters")

function entity2input(entity) {
  let gql = ""
  gql += `input ${entity.name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2input
