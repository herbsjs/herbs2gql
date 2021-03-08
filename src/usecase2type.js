const { camelCase } = require('lodash')
const { schemaOptions, usecaseResponse2gql, usecaseFieldToParams } = require("./helpers/gqlConverters")
const { checker } = require('suma')
const { useCaseValidator } = require('./herbsValidator')

function usecase2type(type, useCase, resolverFunc, options) {
    const schema = schemaOptions(options)
    const validation = useCaseValidator(useCase)
    if (!checker.isEmpty(validation)) {
        const error = new Error()
        error.name = 'InvalidUseCase'
        error.message = JSON.stringify(validation)
        error.invalidArgs = validation
        throw error
    }

    const convention = options?.convention?.inputNameRule || camelCase

    let nameFormatted
    if (options?.inputName) nameFormatted = options.inputName
    else  nameFormatted = convention(useCase.description)

    const usecaseParams = usecaseFieldToParams(useCase, schema)
    const usecaseResponse = usecaseResponse2gql(useCase, schema.presenceOnResponse)
    
    const gql = `extend type ${type} { ${nameFormatted} ${usecaseParams}: ${usecaseResponse} }`
    const resolver = { [type]: { [nameFormatted]: resolverFunc } }

    return [gql, resolver]
}

module.exports = usecase2type


