const assert = require('assert')
const { entity, field } = require('gotu')
const entity2gql = require('../src/entity2gql')

describe('Entity 2 GQL String', () => {

    it('should convert a entity to GQL', async () => {
        // given
        const givenAnEntity = entity('Entity', {
            stringField: field(String),
            stringArrayField: field([String]),
            numberField: field(Number),
            numberArrayField: field([Number]),
            stringWithPresence: field(String, {
                validation: { presence: true }
            }),
            stringArrayWithPresence: field([String], {
                validation: { presence: true }
            }),
            booleanField: field(Boolean),
            booleanArrayField: field([Boolean]),
            dateField: field(Date),
            dateArrayField: field([Date]),
            // objectField: field(Object),
            // arrayField: field(Array),
        })

        // when
        const gql = entity2gql(givenAnEntity)

        // then
        assert.deepStrictEqual(gql,
            `type Entity {
    stringField: String
    stringArrayField: [String]
    numberField: Float
    numberArrayField: [Float]
    stringWithPresence: String
    stringArrayWithPresence: [String]
    booleanField: Boolean
    booleanArrayField: [Boolean]
    dateField: Date
    dateArrayField: [Date]
}`
        )
    })
})