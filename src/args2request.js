function args2request(args, useCase, _info) {
    const isMutation = _info?.operation?.operation === 'mutation'
    if (isMutation && args?.input) args = args.input
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) params[field] = args[field]
    return params
}

module.exports = args2request
