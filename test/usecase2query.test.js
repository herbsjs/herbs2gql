const assert = require('assert')
const { usecase } = require('@herbsjs/buchu')
const { entity, field } = require('@herbsjs/gotu')
const { usecase2query } = require("../src/herbs2gql")
const User = require('./support/gotu/users')

describe('UseCase 2GQL Query', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql, `extend type Query { useCaseTest : Boolean }`)
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : Boolean }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: [String], numberField: [Float], dateField: [Date], booleanField: [Boolean]) : Boolean }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : [Boolean] }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : User }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : [User] }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })

        })

        it('should convert a usecase with entity types and entity array on request params types and gotu array entity output to GQL', async () => {
            // given
            const GivenAnEntity = entity("Entity", {
                numberField: field(Number),
                customEntityFunction: function () { }
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean, entityField: EntityInput, entityFieldArray: [EntityInput]) : [User] }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : User }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })

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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc, {
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : User! }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : User! }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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

            // eslint-disable-next-line no-unused-vars
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2query(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Query { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : [User]! }`
            )
            assert.deepStrictEqual(resolver, { Query: { useCaseTest: resolverFunc } })
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
            assert.throws(() => usecase2query(givenAnUseCase, null), {
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
            assert.throws(() => usecase2query(givenAnUseCase, null), {
                invalidArgs: {response:[{cantBeEmpty:true},{cantBeNull:true}]}
            })
        })

    })

})