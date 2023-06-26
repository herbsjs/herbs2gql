const { camelCase, upperFirst } = require('lodash')
const { schemaOptions, usecaseResponse2gql, usecaseFieldToParams } = require("./helpers/gqlConverters")
const { checker } = require('@herbsjs/suma')
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

    const ucParams = (useCase, schema, nameFormatted) => {
        if (checker.isEmpty(useCase.requestSchema)) return ''
        if (type === 'Mutation') return `(input: ${upperFirst(camelCase(nameFormatted))}Input)`
        else return usecaseFieldToParams(useCase, schema)
    }

    const convention = options?.convention?.inputNameRule || camelCase
    const nameFormatted = options?.inputName || convention(useCase.description)
    const usecaseParams = ucParams(useCase, schema, nameFormatted)
    const usecaseResponse = usecaseResponse2gql(useCase, schema.presenceOnResponse)

    const gql = `extend type ${type} { ${nameFormatted} ${usecaseParams}: ${usecaseResponse} }`
    const resolver = { [type]: { [nameFormatted]: resolverFunc } }

    return [gql, resolver]
}



module.exports = usecase2type
