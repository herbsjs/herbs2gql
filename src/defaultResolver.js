const { UserInputError, ForbiddenError } = require('apollo-server-express')
const args2request = require('./args2request')

function defaultResolver(usecase) {

    // eslint-disable-next-line no-unused-vars
    return async function resolver(parent, args, context, info) {

        const uc = usecase()

        /* Authorization */
        const hasAccess = uc.authorize(context.user)
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
        if (response.isErr) throw new UserInputError(null, { invalidArgs: response.err })
        return response.ok
    }
}

module.exports = defaultResolver
