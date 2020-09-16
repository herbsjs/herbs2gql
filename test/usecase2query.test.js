const assert = require('assert')
const { usecase } = require('buchu')
const usecase2query = require('../src/usecase2query')

describe('UseCase 2 GQL String', () => {

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
        const gql = usecase2query(givenAnUseCase)

        // then
        assert.deepStrictEqual(gql, 
            `type Query {\n    useCaseTest (    stringField: String,\n    numberField: Float,\n    dateField: Date,\n    booleanField: Boolean) : String\n}`
        )
    })

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