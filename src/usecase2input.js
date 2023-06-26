const entity2input = require('./entity2input')
const { entity, field } = require('@herbsjs/herbs')

function usecase2input(usecase, options = {}) {
    const name = options?.inputName || usecase.description
    const schema = usecase.requestSchema
    if (!schema) return ''
    Object.keys(schema).forEach((key) => schema[key] = field(schema[key]))
    return entity2input(entity(name, schema), options)
}

module.exports = usecase2input