const usecase2type = require('./usecase2type')

function usecase2mutation(useCase, resolverFunc, options, customName) {
    return usecase2type('Mutation', useCase, resolverFunc, options, customName)
}

module.exports = usecase2mutation


