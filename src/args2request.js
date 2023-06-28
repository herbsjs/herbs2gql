const { entity, tryParse } = require('@herbsjs/herbs')

function args2request(args, useCase, _info) {
    const isMutation = _info?.operation?.operation === 'mutation'
    if (isMutation && args?.input) args = args.input
    const params = {}
    const fields = Object.keys(useCase.requestSchema)
    for (const field of fields) {
        const name = field
        const type = useCase.requestSchema[field]
        params[name] = parametersCast(args[name], type)
    }
    return params
}

function parametersCast(value, type) {
    if (Array.isArray(type)) return value?.map(item => defaultConvention.parametersCast(item, type[0]))
    if (entity.isEntity(type) && value) return type.fromJSON(value)
    return tryParse(value, type)
}

module.exports = args2request
