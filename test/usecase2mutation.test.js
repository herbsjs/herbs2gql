const assert = require('assert')
const { usecase } = require('@herbsjs/herbs')
const { usecase2mutation } = require("../src/herbs2gql")

describe('UseCase 2 GQL Mutation', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { useCaseTest : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
        })
    })

    context('when a convention is given', () => {
        it('should convert a usecase with convention for name', async () => {
            // given
            const givenAnUseCase = usecase('usecasetest', {
                request: {
                    stringField: String,
                },
                response: Boolean
            })

            // eslint-disable-next-line no-unused-vars            
            const resolverFunc = (parent, args, context, info) => { }

            const options = { convention: { inputNameRule: (str) => `mutation-${str}` } }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { mutation-usecasetest (input: MutationUsecasetestInput): Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { "mutation-usecasetest": resolverFunc } })
        })
    })

    context('when a custom name is given', () => {
        it('should convert a usecase without request and basic output to GQL with customName', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                },
                response: Boolean
            })

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            const options = { inputName: 'Use_Case_Test' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { Use_Case_Test (input: UseCaseTestInput): Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { Use_Case_Test: resolverFunc } })
        })
    })

    context('when schema is simple data', () => {
        it('should convert a usecase with a input type', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: Boolean
            })

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (input: UseCaseTestInput): Boolean }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
        })
    })

    context('when usecase is invalid', () => {

        it('should throw error if usecase name is empty', async () => {
            // given
            const givenAnUseCase = usecase('', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: Boolean
            })

            // then
            assert.throws(() => usecase2mutation(givenAnUseCase, null), {
                invalidArgs: {
                    useCaseName: [{ cantBeEmpty: true }]
                }
            })
        })

        it('should throw error if response name is not defined', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                }
            })

            // then
            assert.throws(() => usecase2mutation(givenAnUseCase, null), {
                invalidArgs: { response: [{ cantBeEmpty: true }, { cantBeNull: true }] }
            })
        })

    })
})