const { pascalCase } = require('./stringCase')
const { checker } = require('suma')

function requestFieldType2gql(type, presence) {
    let name
    if (Array.isArray(type))
        name = `[${requestFieldType2gql(type[0], false)}]`
    else if (type === Number)
        name = `Float`
    else
        name = pascalCase(type.name)

    return presence ? `${name}!` : name
}

function usecaseRequest2gql(useCase, presence) {
    const fields = Object.keys(useCase.requestSchema)
    const output = []
    for (const field of fields) {
        const type = useCase.requestSchema[field]
        let name = requestFieldType2gql(type, presence)
        output.push(`    ${field}: ${name}`)

    }
    return output.join(`,\n`)
}

function usecaseResponse2gql(useCase, presence) {
    let name = requestFieldType2gql(useCase.responseSchema, presence)
    return name
}

function schemaOptions(options) {
    return Object.assign({
        presenceOnRequest: false,
        presenceOnResponse: false
    }, options || {})
}

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
        
        if(typeof entity.prototype.meta.schema[field] === 'function') continue

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

function usecaseFieldToParams(useCase, schema) {
    const hasResponse = !checker.isEmpty(useCase.requestSchema)
    if (hasResponse) return `(${usecaseRequest2gql(useCase, schema.presenceOnRequest)}) `
    return ''
}

module.exports = {
    requestFieldType2gql,
    usecaseRequest2gql,
    usecaseResponse2gql,
    usecaseFieldToParams,
    schemaOptions,
    entityFieldType2gql,
    entityField2gql
}