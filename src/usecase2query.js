const usecase = require("buchu/src/usecase")
const { camelCase } = require("lodash")

function requestFieldType2gql(type) {
    let name
    if (Array.isArray(type))
        name = `[${requestFieldType2gql(type[0])}]`
    else if (type === Number)
        name = `Float`
    else
        name = type.name
    return name
}

function usecaseRequest2gql(useCase) {
    const fields = Object.keys(useCase.requestSchema)
    const output = [];
    for (const field of fields) {
        const type = useCase.requestSchema[field]
        let name = requestFieldType2gql(type)
        output.push(`    ${field}: ${name}`);
        
    }
    return output.join(`,\n`)
}

function usecaseResponse2gql(useCase) {    
    let name = requestFieldType2gql(useCase.responseSchema)
    return name;
}

function usecase2query(useCase) {
    let gql = ''
    gql += `type Query {\n`
    gql += `    ${camelCase(useCase.description)} (${usecaseRequest2gql(useCase)}) : ${usecaseResponse2gql(useCase)}\n`
    gql += '}'
    return gql
}

module.exports = usecase2query
