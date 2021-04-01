const { UserInputError, ForbiddenError } = require('apollo-server-express')
const args2request = require('./args2request')

function defaultResolver(usecase) {

    // eslint-disable-next-line no-unused-vars
    return async function resolver(parent, args, context, info) {

        /* Authorization */
        const hasAccess = usecase.authorize(context.user)
        if (hasAccess === false) {
            // eslint-disable-next-line no-console
            console.info(usecase.auditTrail)
            throw new ForbiddenError()
        }

        /* Execution */
        const request = args2request(args, usecase)
        const response = await usecase.run(request)

        /* Audit */
        // eslint-disable-next-line no-console
        console.info(usecase.auditTrail)

        /* Response */
        if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
        return response.ok
    }
}

module.exports = defaultResolver
