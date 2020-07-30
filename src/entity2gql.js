
function entityFieldType2gql(type) {
    let name
    if (Array.isArray(type))
        name = `[${entityFieldType2gql(type[0])}]`
    else if (type === Number)
        name = `Float`
    else
        name = type.name
    return name
}

function entityField2gql(entity) {
    const fields = Object.keys(entity.prototype.meta.schema)
    let gql = ''
    for (const field of fields) {
        const type = entity.prototype.meta.schema[field].type
        let name = entityFieldType2gql(type)
        gql += `    ${field}: ${name}\n`
    }
    return gql
}

function entity2gql(entity) {
    let gql = ''
    gql += `type ${entity.name} {\n`
    gql += entityField2gql(entity)
    gql += '}'
    return gql
}

module.exports = entity2gql
