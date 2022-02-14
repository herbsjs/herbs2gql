const { ForbiddenError } = require('apollo-server-express')
const { defaultErrorHandler } = require('./defaultErrorHandler')
const args2request = require('./args2request')

const defaultOptions = {
    errorHandler: defaultErrorHandler
}

function defaultResolver(usecase, { errorHandler } = defaultOptions) {

    const handleError = errorHandler ?? defaultErrorHandler

    return async function resolver(_parent, args, context, _info) {

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
            return await handleError(response)
        }

        return response.ok
    }
}

module.exports = defaultResolver
