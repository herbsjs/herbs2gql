const { UserInputError, ForbiddenError, ApolloError } = require('apollo-server-express')
const args2request = require('./args2request')

function defaultResolver(usecase) {

    // eslint-disable-next-line no-unused-vars
    return async function resolver(parent, args, context, info) {

        const uc = usecase()

        /* Authorization */
        const hasAccess = await uc.authorize(context.user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(uc.auditTrail)
            throw new ForbiddenError()
        }

        /* Execution */
        const request = args2request(args, uc)
        const response = await uc.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(uc.auditTrail)

        /* Response */
        if (response.isErr) {
            if (response.isPermissionDeniedError)
                throw new ForbiddenError(response.err.message, { cause: response.err })

            if (response.isInvalidArgumentsError ||
                response.isInvalidEntityError)
                throw new UserInputError(response.err.message, { cause: response.err })

            if (response.isNotFoundError ||
                response.isAlreadyExistsError ||
                response.isUnknownError)
                throw new ApolloError(response.err.message, response.err.code, { cause: response.err })

            throw new UserInputError(null, { cause: response.err })
        }

        return response.ok
    }
}

module.exports = defaultResolver
