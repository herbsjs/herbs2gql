const usecase2type = require('./usecase2type')

function usecase2subscription(useCase, resolverFunc, options, customName) {
    return usecase2type('Subscription', useCase, resolverFunc, options, customName)
}

module.exports = usecase2subscription