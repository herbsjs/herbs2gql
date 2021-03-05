const assert = require('assert')
const { usecase } = require('buchu')
const { entity, field } = require('gotu')
const { usecase2mutation } = require("../src/herbs2gql")
const User = require('./support/gotu/users')

describe('UseCase 2 GQL Mutation', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { useCaseTest : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
        })

        it('should convert a usecase without request and basic output to GQL with options convention snakecase', async () => {
            // given
            const givenAnUseCase = usecase('USECaseTEST', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }
            const options = { convention: 'snakecase' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { use_case_test : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { use_case_test: resolverFunc } })
        })

        
        it('should convert a usecase without request and basic output to GQL with options convention uppercase', async () => {
            // given
            const givenAnUseCase = usecase('usecasetest', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }
            const options = { convention: 'uppercase' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { USECASETEST : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { USECASETEST: resolverFunc } })
        })

        it('should convert a usecase without request and basic output to GQL with options convention lowercase', async () => {
            // given
            const givenAnUseCase = usecase('USECASETEST', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }
            const options = { convention: 'lowercase' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { usecasetest : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { usecasetest: resolverFunc } })
        })

        it('should convert a usecase without request and basic output to GQL with options convention startcase', async () => {
            // given
            const givenAnUseCase = usecase('usecasetest', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }
            const options = { convention: 'startcase' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { Usecasetest : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { Usecasetest: resolverFunc } })
        })

        it('should convert a usecase without request and basic output to GQL with customName', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })
            const resolverFunc = (parent, args, context, info) => { }
            const options = { customName: 'Use_Case_Test' }
            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)

            // then
            assert.deepStrictEqual(gql, `extend type Mutation { Use_Case_Test : Boolean }`)
            assert.deepStrictEqual(resolver, { Mutation: { Use_Case_Test: resolverFunc } })
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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : Boolean }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: [String], numberField: [Float], dateField: [Date], booleanField: [Boolean]) : Boolean }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : [Boolean] }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })

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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : User }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })
            
        })

        it('should convert an usecase with entity types and entity array on request params types and gotu array entity output to GQL', async () => {
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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc)

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean, entityField: EntityInput, entityFieldArray: [EntityInput]) : [User] }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })

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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : User }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })

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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, {
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String, numberField: Float, dateField: Date, booleanField: Boolean) : User! }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })

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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : User! }`
            )
            assert.deepStrictEqual(resolver, { Mutation: { useCaseTest: resolverFunc } })

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
            const resolverFunc = (parent, args, context, info) => { }

            // when
            const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, {
                presenceOnRequest: true,
                presenceOnResponse: true
            })

            // then
            assert.deepStrictEqual(gql,
                `extend type Mutation { useCaseTest (stringField: String!, numberField: Float!, dateField: Date!, booleanField: Boolean!) : [User]! }`
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
                invalidArgs: { response: [{ cantBeEmpty: true }] }
            })
        })

    })
})