const { camelCase, upperFirst } = require('lodash')
const { checker, entity } = require('@herbsjs/herbs')
const stringCase = require('./stringCase')

const hasIDs = (entity) => entity.schema.fields.some((field) => field.options?.isId)

function requestFieldType2gql(type, presence, input) {
    let name
    if (Array.isArray(type))
        name = `[${requestFieldType2gql(type[0], false, input)}]`
    else if (type === Number)
        name = `Float`
    else if (entity.isEntity(type)) {
        name = upperFirst(camelCase(type.name))
        if (input)
            if (hasIDs(type)) name = `${name}IDsInput`
            else name = `${name}Input`
    }
    else
        name = stringCase.pascalCase(type.name)

    return presence ? `${name}!` : name
}

function usecaseRequest2gql(useCase, presence) {
    const fields = Object.keys(useCase.requestSchema)
    const output = []
    for (const field of fields) {
        const type = useCase.requestSchema[field]
        let name = requestFieldType2gql(type, presence, true)
        output.push(`${field}: ${name}`)
    }
    return output.join(`, `)
}

function usecaseResponse2gql(useCase, presence) {
    let name = requestFieldType2gql(useCase.responseSchema, presence, false)
    return name
}

function schemaOptions(options) {
    return Object.assign({
        presenceOnRequest: false,
        presenceOnResponse: false
    }, options || {})
}

function entityFieldType2gql(type, param) {
    let name
    if (Array.isArray(type)) name = `[${entityFieldType2gql(type[0], param)}]`
    else if (type === Number) name = `Float`
    else if (entity.isEntity(type)) {
        const typeNames = upperFirst(camelCase(type.name))
        if (param == 'type') name = typeNames
        if (param == 'input')
            if (hasIDs(type)) name = `${typeNames}IDsInput`
            else name = `${typeNames}Input`
    }
    else name = upperFirst(camelCase(type.name))
    return name
}

function entityField2gql(entity, param, ids) {

    let fields = entity.schema.fields
    if (ids === entityField2gql.ids.includes) fields = fields
    if (ids === entityField2gql.ids.excludes) fields = fields.filter(field => field.options?.isId !== true)
    if (ids === entityField2gql.ids.only) fields = fields.filter(field => field.options?.isId === true)

    let gql = ""
    for (const field of fields) {
        if (typeof field === 'function') continue

        const { type, options } = field
        let name = entityFieldType2gql(type, param)
        let typeOptions = fieldOptions2gpq(options)

        gql += `${field.name}: ${name}${typeOptions}\n`
    }
    return gql
}

entityField2gql.ids = {
    includes: -1,
    excludes: 1,
    only: 0
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