const { entityField2gql } = require("./helpers/gqlConverters")

function entity2type(entity) {
  let gql = ""
  gql += `type ${entity.name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = entity2type
