const usecase2type = require('./usecase2type')

function usecase2subscription(useCase, resolverFunc, options) {
    return usecase2type('Subscription', useCase, resolverFunc, options)
}

module.exports = usecase2subscription