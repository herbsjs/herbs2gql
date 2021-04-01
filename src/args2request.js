function args2request(args, useCase) {
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) params[field] = args[field]
    return params
}

module.exports = args2request
