const { camelCase } = require('lodash')
const { schemaOptions, usecaseResponse2gql, usecaseFieldToParams } = require("./helpers/gqlConverters")
const { useCaseValidator } = require('./herbsValidator')
const { checker } = require('suma')

function usecase2query(useCase, options) {
    const schema = schemaOptions(options)
    const validation = useCaseValidator(useCase)
    if (!checker.isEmpty(validation)) {
        const error = Error('InvalidUseCase')
        error.invalidArgs = validation
        throw error
    }
    let gql = ''
    gql += `extend type Query {\n`
    gql += `    ${camelCase(useCase.description)} ${usecaseFieldToParams(useCase, schema)}: ${usecaseResponse2gql(useCase, schema.presenceOnResponse)}\n`
    gql += '}'
    return gql
}



module.exports = usecase2query






