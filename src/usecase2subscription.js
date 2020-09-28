const { camelCase } = require("lodash")
const { schemaOptions, usecaseRequest2gql, usecaseResponse2gql } = require("./helpers/gqlConverters")

function usecase2subscription(useCase, options) {
    const { presenceOnRequest, presenceOnResponse } = schemaOptions(options)
    let gql = ''
    gql += `extend type Subscription {\n`
    gql += `    ${camelCase(useCase.description)} (${usecaseRequest2gql(useCase, presenceOnRequest)}) : ${usecaseResponse2gql(useCase, presenceOnResponse)}\n`
    gql += '}'
    return gql
}


module.exports = usecase2subscription


