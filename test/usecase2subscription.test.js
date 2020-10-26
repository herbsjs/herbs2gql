const assert = require('assert')
const { usecase } = require('buchu')
const { usecase2subscription } = require("../src/herbs2gql")
const User = require('./support/gotu/users')

describe('UseCase 2GQL Subscription', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })

            // when
            const gql = usecase2subscription(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest : Boolean\n}`
            )
        })

    })

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

                response: Boolean
            })

            // when
            const gql = usecase2subscription(givenAnUseCase,)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : Boolean\n}`
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

                response: Boolean
            })

            // when
            const gql = usecase2subscription(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: [String],\n    numberField: [Float],\n    dateField: [Date],\n    booleanField: [Boolean]) : Boolean\n}`
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

                response: [Boolean]
            })

            // when
            const gql = usecase2subscription(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [Boolean]\n}`
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
            })

            // when
            const gql = usecase2subscription(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User\n}`
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
            })

            // when
            const gql = usecase2subscription(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [User]\n}`
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
            })

            // when
            const gql = usecase2subscription(givenAnUseCase, {
                presenceOnRequest: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User\n}`
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
            })

            // when
            const gql = usecase2subscription(givenAnUseCase, {
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User!\n}`
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
            })

            // when
            const gql = usecase2subscription(givenAnUseCase, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User!\n}`
            )
        })

        it('should convert a usecase with not nullable request params types and not nullable gotu array entity output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean
                },
    
                response: [User]
            })
    
            // when
            const gql = usecase2subscription(givenAnUseCase, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })
    
            // then
            assert.deepStrictEqual(gql,
                `extend type Subscription {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : [User]!\n}`
            )
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
            assert.throws(() => usecase2subscription(givenAnUseCase), {
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
            assert.throws(() => usecase2subscription(givenAnUseCase), {
                invalidArgs: { response: [{ cantBeEmpty: true }] }
            })
        })

    })

})