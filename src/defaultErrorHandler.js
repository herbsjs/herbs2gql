const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server-express')

const defaultErrorHandler = function (usecaseResponse) {
    if (usecaseResponse.isPermissionDeniedError)
        throw new ForbiddenError(usecaseResponse.err.message, { cause: usecaseResponse.err })

    if (usecaseResponse.isInvalidArgumentsError ||
        usecaseResponse.isInvalidEntityError)
        throw new UserInputError(usecaseResponse.err.message, { cause: usecaseResponse.err })

    if (usecaseResponse.isNotFoundError ||
        usecaseResponse.isAlreadyExistsError ||
        usecaseResponse.isUnknownError)
        throw new ApolloError(usecaseResponse.err.message, usecaseResponse.err.code, { cause: usecaseResponse.err })

    throw new UserInputError(null, { cause: usecaseResponse.err })
}

module.exports = { defaultErrorHandler }
