const { validate, checker } = require('@herbsjs/suma')

const useCaseValidator = (useCase) => {
    let output = {}
    const defaultValidator = {
        presence: true,
        allowNull: false
    }

    const withTypeValidator = {
        presence: true,
        allowNull: false,
        type: String
    }

    const responseValidation = validate(useCase.responseSchema, defaultValidator)
    const nameValidation = validate(useCase.description, withTypeValidator)

    if (!checker.isEmpty(nameValidation.errors))
        output.useCaseName = nameValidation.errors

    if (!checker.isEmpty(responseValidation.errors))
        output.response = responseValidation.errors

    return output
}

const entityValidator = (entity) => {
    let output = {}
    const validations = {
        presence: true,
        allowNull: false,
        type: String
    }
    const { errors } = validate(entity.name, validations)

    if (!checker.isEmpty(errors))
        output.entityName = errors

    return output
}

module.exports = { useCaseValidator, entityValidator }