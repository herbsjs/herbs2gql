const { pascalCase } = require("./stringCase")

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

module.exports = {
    requestFieldType2gql,
    usecaseRequest2gql,
    usecaseResponse2gql,
    schemaOptions
}