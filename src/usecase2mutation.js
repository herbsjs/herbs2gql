const usecase2type = require('./usecase2type')

function usecase2mutation(useCase, resolverFunc, options) {
    return usecase2type('Mutation', useCase, resolverFunc, options)
}

module.exports = usecase2mutation


