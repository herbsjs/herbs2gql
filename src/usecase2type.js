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

    let nameFormated
    if (schema.customName !== '') nameFormated = schema.customName
    else if (!schema.camelCase) nameFormated = useCase.description
    else  nameFormated = camelCase(useCase.description)

    const usecaseParams = usecaseFieldToParams(useCase, schema)
    const usecaseResponse = usecaseResponse2gql(useCase, schema.presenceOnResponse)
    
    const gql = `extend type ${type} { ${nameFormated} ${usecaseParams}: ${usecaseResponse} }`
    const resolver = { [type]: { [nameFormated]: resolverFunc } }

    return [gql, resolver]
}


module.exports = usecase2type


