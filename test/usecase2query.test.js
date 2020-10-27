const assert = require('assert')
const { usecase } = require('buchu')
const { entity, field } = require('gotu')
const { usecase2query } = require("../src/herbs2gql")
const User = require('./support/gotu/users')

describe('UseCase 2GQL Query', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest : Boolean\n}`
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
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : Boolean\n}`
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
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: [String],\n    numberField: [Float],\n    dateField: [Date],\n    booleanField: [Boolean]) : Boolean\n}`
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
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [Boolean]\n}`
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
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User\n}`
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
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : [User]\n}`
            )
        })

        it('should convert a usecase with entity types and entity array on request params types and gotu array entity output to GQL', async () => {
            // given
            const GivenAnEntity = entity("Entity", {
                numberField: field(Number),
                customEntityFunction: function(){}        
            })

            const givenAnUseCase = usecase('UseCaseTest', {
                request: {
                    stringField: String,
                    numberField: Number,
                    dateField: Date,
                    booleanField: Boolean,
                    entityField: GivenAnEntity,
                    entityFieldArray: [GivenAnEntity]
                },

                response: [User]
            })

            // when
            const gql = usecase2query(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean,\n    entityField: EntityInput,\n    entityFieldArray: [EntityInput]) : [User]\n}`
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
            const gql = usecase2query(givenAnUseCase, {
                presenceOnRequest: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User\n}`
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
            const gql = usecase2query(givenAnUseCase, {
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : User!\n}`
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
            const gql = usecase2query(givenAnUseCase, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : User!\n}`
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
            const gql = usecase2query(givenAnUseCase, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query {\n    useCaseTest (    stringField: String!,\n    numberField: Float!,\n    dateField: Date!,\n    booleanField: Boolean!) : [User]!\n}`
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
            assert.throws(() => usecase2query(givenAnUseCase), {
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
            assert.throws(() => usecase2query(givenAnUseCase), {
                invalidArgs: { response: [{ cantBeEmpty: true }] }
            })
        })

    })

})