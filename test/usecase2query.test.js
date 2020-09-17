const assert = require('assert')
const { usecase } = require('buchu')
const usecase2query = require('../src/usecase2query')
const User = require('./support/gotu/users')

describe('UseCase 2 GQL String', () => {

    context('when schema is simple data', () => {
        it('should convert a usecase with primitive request params types and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: String
            });

            // when
            const gql = usecase2query(givenAnUseCase,)

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : String\n}`
            )
        })
    })

    context('when schema is array data', () => {
        it('should convert a usecase with array request params types and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: [String],
                    numberField: [Number],
                    dateField: [Date],
                    booleanField: [Boolean]
                },

                response: String
            });

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: [String],\n    numberField: [Float],\n    dateField: [Date],\n    booleanField: [Boolean]) : String\n}`
            )
        })

        it('should convert a usecase with primitive request params types and array output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: [String]
            });

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [String]\n}`
            )
        })
    })

    context('when schema is complex data', () => {
        it('should convert a usecase with primitive request params types and gotu entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: User
            });

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User\n}`
            )
        })

        it('should convert a usecase with primitive request params types and gotu array entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: [User]
            });

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [User]\n}`
            )
        })
    })

    context('when schema is required data', () => {
        it('should convert a usecase with not nullable request params types and gotu entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: User
            });

            // when
            const gql = usecase2query(givenAnUseCase, {
                presenceOnRequest: true
            })

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User\n}`
            )
        })

        it('should convert a usecase with request params types and not nullable gotu entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: User
            });

            // when
            const gql = usecase2query(givenAnUseCase, {
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User!\n}`
            )
        })

        it('should convert a usecase with not nullable request params types and not nullable gotu entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },

                response: User
            });

            // when
            const gql = usecase2query(givenAnUseCase, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `type Query {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User!\n}`
            )
        })
    })
})