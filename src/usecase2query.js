const usecase2type = require('./usecase2type')

function usecase2query(useCase, resolverFunc, options, customName) {
    return usecase2type('Query', useCase, resolverFunc, options, customName)
}

module.exports = usecase2query