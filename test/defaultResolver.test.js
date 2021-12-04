const assert = require('assert')
const { Ok, Err, usecase, step } = require('@herbsjs/herbs')
const defaultResolver = require('../src/defaultResolver')

describe('GraphQL - Default Resolver', () => {

    it('should resolve and run a use case', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step((ctx) => { return Ok(ctx.ret = 'result') }
                )
            })

        const resolver = defaultResolver(AUseCase)

        // When
        const ret = await resolver(null, {}, { user: {} })

        // Then
        assert.deepStrictEqual(ret, 'result')

    })

    it('should throw a UserInputError if the uc returns a Err', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => { return Err("error") }
                )
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'UserInputError')
                assert.strictEqual(err.extensions.cause, 'error')
                return true
            }
        )
    })

    it('should throw a ForbiddenError if the uc returns a Err.permissionDenied', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.permissionDenied({ message: `Permission Denied X`, payload: { entity: 'entity Y' } })
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'ForbiddenError')
                assert.strictEqual(err.message, 'Permission Denied X')
                assert.strictEqual(err.extensions.cause.code, 'PERMISSION_DENIED')
                return true
            }
        )
    })

    it('should throw a UserInputError if the uc returns a Err.invalidArguments', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.invalidArguments({ message: `Invalid Arg X`, payload: { entity: 'entity Y' } }, 'Arg X')
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'UserInputError')
                assert.strictEqual(err.message, 'Invalid Arg X')
                assert.strictEqual(err.extensions.cause.code, 'INVALID_ARGUMENTS')
                return true
            }
        )
    })

    it('should throw a UserInputError if the uc returns a Err.invalidEntity', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.invalidEntity({ message: `Invalid Entity X`, payload: { entity: 'entity Y' } })
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'UserInputError')
                assert.strictEqual(err.message, 'Invalid Entity X')
                assert.strictEqual(err.extensions.cause.code, 'INVALID_ENTITY')
                return true
            }
        )
    })

    it('should throw a ApolloError if the uc returns a Err.notFound', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.notFound({ message: `Not Found X`, payload: { entity: 'entity Y' } })
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'Error')
                assert.strictEqual(err.message, 'Not Found X')
                assert.strictEqual(err.extensions.cause.code, 'NOT_FOUND')
                return true
            }
        )
    })

    it('should throw a ApolloError if the uc returns a Err.alreadyExists', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.alreadyExists({ message: `Already Exists X`, payload: { entity: 'entity Y' } })
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'Error')
                assert.strictEqual(err.message, 'Already Exists X')
                assert.strictEqual(err.extensions.cause.code, 'ALREADY_EXISTS')
                return true
            }
        )
    })

    it('should throw a ApolloError if the uc returns a Err.unknown', async () => {
        // Given
        const AUseCase = () =>
            usecase('Use Case X', {
                request: { id: Number },
                response: Number,
                authorize: async () => Ok(),
                'Step 1': step(() => {
                    return Err.unknown({ message: `Unknown X`, payload: { entity: 'entity Y' } })
                })
            })

        const resolver = defaultResolver(AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'Error')
                assert.strictEqual(err.message, 'Unknown X')
                assert.strictEqual(err.extensions.cause.code, 'UNKNOWN')
                return true
            }
        )
    })

    it('should not run a use case if not autorized and throw a ForbiddenError', async () => {
        // Given
        const AUseCase = {
            requestSchema: { id: Number },
            responseSchema: Number,
            async authorize() { return false }
        }

        const resolver = defaultResolver(() => AUseCase)

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'ForbiddenError')
                return true
            }
        )
    })
})


