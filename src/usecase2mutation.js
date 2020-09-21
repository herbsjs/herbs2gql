const usecase = require("buchu/src/usecase")
const { camelCase } = require("lodash")

function requestFieldType2gql(type, presence) {
    let name
    if (Array.isArray(type))
        name = `[${requestFieldType2gql(type[0], presence)}]`
    else if (type === Number)
        name = `Float`
    else
        name = type.name

    return presence ? `${name}!` : name
}

function usecaseRequest2gql(useCase, presence) {
    const fields = Object.keys(useCase.requestSchema)
    const output = [];
    for (const field of fields) {
        const type = useCase.requestSchema[field]
        let name = requestFieldType2gql(type, presence)
        output.push(`    ${field}: ${name}`);

    }
    return output.join(`,\n`)
}

function usecaseResponse2gql(useCase, presence) {
    let name = requestFieldType2gql(useCase.responseSchema, presence)
    return name;
}

function schemaOptions(options) {
    return Object.assign({
        presenceOnRequest: false,
        presenceOnResponse: false
    }, options || {})
}

function usecase2mutation(useCase, options) {

    const {
        presenceOnRequest,
        presenceOnResponse
    } = schemaOptions(options)

    let gql = ''
    gql += `type Mutation {\n`
    gql += `    ${camelCase(useCase.description)} (${usecaseRequest2gql(useCase, presenceOnRequest)}) : ${usecaseResponse2gql(useCase, presenceOnResponse)}\n`
    gql += '}'
    return gql
}


module.exports = usecase2mutation


