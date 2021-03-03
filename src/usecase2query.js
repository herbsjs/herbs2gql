const usecase2type = require('./usecase2type')

function usecase2query(useCase, resolverFunc, options) {
    return usecase2type('Query', useCase, resolverFunc, options)
}

module.exports = usecase2query