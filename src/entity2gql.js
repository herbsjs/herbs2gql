function entityFieldType2gql(type) {
  let name
  if (Array.isArray(type)) name = `[${entityFieldType2gql(type[0])}]`
  else if (type === Number) name = `Float`
  else name = type.name
  return name
}

function entityField2gql(entity) {
  const fields = Object.keys(entity.prototype.meta.schema)
  let gql = ""
  for (const field of fields) {
    const { type, options } = entity.prototype.meta.schema[field]

    let name = entityFieldType2gql(type)

    let typeOptions = fieldOptions2gpq(options)

    gql += `    ${field}: ${name}${typeOptions}\n`
  }
  return gql
}

function fieldOptions2gpq(options) {
  let optionsGql = ``
  const { validation } = options

  if (validation) validation.presence && (optionsGql += `!`)

  return optionsGql
}

function toType(entity) {
  let gql = ""
  gql += `type ${entity.name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

function toInput(entity) {
  let gql = ""
  gql += `input ${entity.name} {\n`
  gql += entityField2gql(entity)
  gql += "}"
  return gql
}

module.exports = { toType, toInput }
