const { camelCase } = require('lodash')
const { schemaOptions, usecaseRequest2gql, usecaseResponse2gql, usecaseFieldToParams } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { useCaseValidator } = require('./herbsValidator')

function usecase2mutation(useCase, options) {
    const schema = schemaOptions(options)
    const validation = useCaseValidator(useCase)
    if (!checker.isEmpty(validation)) {
        const error = Error('InvalidUseCase')
        error.invalidArgs = validation
        throw error
    }

    let gql = ''
    gql += `extend type Mutation {\n`
    gql += `    ${camelCase(useCase.description)} ${usecaseFieldToParams(useCase, schema)}: ${usecaseResponse2gql(useCase, schema.presenceOnResponse)}\n`
    gql += '}'
    return gql
}


module.exports = usecase2mutation


