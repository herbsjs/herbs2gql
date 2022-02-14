const assert = require('assert')
const { Ok, usecase, step, Err } = require('@herbsjs/herbs')
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

    it('should use the custom error handler when it is provided on options', async () => {
        const tracker = new assert.CallTracker()
        const customErrorHandler = tracker.calls(() => { })

        const myUsecase = () => usecase('My Usecase', {
            request: {},
            authorize: () => Ok(),
            'step': step(() => Err('error'))
        })

        const resolver = defaultResolver(myUsecase, {
            errorHandler: customErrorHandler
        })

        await resolver(null, {}, { user: {} })

        process.on('exit', () => {
            tracker.verify()
        })
    })

    it('should use the default error handler when no custom handler is provided on options', async () => {
        const myUsecase = () => usecase('My Usecase', {
            request: {},
            authorize: () => Ok(),
            'step': step(() => Err('error'))
        })

        const resolver = defaultResolver(myUsecase, {})

        await assert.rejects(
            async () => await resolver(null, {}, { user: {} }),
            (err) => {
                assert.equal(err.name, 'UserInputError')
                return true
            })
    })
})


