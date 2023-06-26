const assert = require('assert')
const { usecase, id, entity, field } = require('@herbsjs/herbs')
const { usecase2input } = require("../src/herbs2gql")

describe('UseCase 2 GQL Input', () => {

    context('when schema does\'t contain request', () => {

        it('should convert a usecase without request and basic output to GQL', async () => {
            // given
            const givenAnUseCase = usecase('UseCaseTest', {
                response: Boolean
            })

            // when
            const gql = usecase2input(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql, ``)
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
            const gql = usecase2input(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `input UseCaseTestInput {
stringField: String
numberField: Float
dateField: Date
booleanField: Boolean
}`
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
            const gql = usecase2input(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `input UseCaseTestInput {
stringField: [String]
numberField: [Float]
dateField: [Date]
booleanField: [Boolean]
}`
            )
        })
    })

    context('when schema is complex data', () => {
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
                }
            })

            // when
            const gql = usecase2input(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `input UseCaseTestInput {
stringField: String
numberField: Float
dateField: Date
booleanField: Boolean
entityField: EntityInput
entityFieldArray: [EntityInput]
}`
            )
        })

        it('should convert an usecase with entity with IDs types and entity array on request params types and gotu array entity output to GQL', async () => {
            // given
            const GivenAnEntity = entity("Entity", {
                idField: id(String),
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
                }
            })

            // when
            const gql = usecase2input(givenAnUseCase)

            // then
            assert.deepStrictEqual(gql,
                `input UseCaseTestInput {
stringField: String
numberField: Float
dateField: Date
booleanField: Boolean
entityField: EntityIDsInput
entityFieldArray: [EntityIDsInput]
}`
            )
        })
    })

    context('when usecase is invalid', () => {

        it('should throw error if usecase name is empty', async () => {
            // given
            const givenAnUseCase = usecase('', {
                request: {
                    stringField: String,
                },
                response: Boolean
            })

            // then
            assert.throws(() => usecase2input(givenAnUseCase, null))
        })
    })
})