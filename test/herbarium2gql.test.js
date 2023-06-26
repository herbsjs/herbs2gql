const assert = require('assert')
const { herbarium } = require('./support/herbarium/genericHerbariumObject')
const { herbs2gql } = require('../src/herbs2gql')

describe('Hebarium to GQL', () => {
  it('Should be able to create types, queries and mutations based on herbarium object', async () => {
    // given
    const { types, queries, mutations } = herbs2gql({ herbarium })

    // then
    assert.deepStrictEqual(types, [
      [
        `
    type Query {
        _: Boolean
      }
    
      type Mutation {
        _: Boolean
      }`,
      ],[
        `type SimpleEntity {
id: Float
stringField: String
}`,
      ],
      [
        `type NoIdEntity {
stringField: String
}`,
      ],
      [
        `type CoolEntity {
id: Float
stringField: String!
boolField: Boolean
dateField: Date
numberField: Float
simpleEntity: SimpleEntity
simpleEntityArray: [SimpleEntity]
noIDEntity: NoIdEntity
noIDEntityArray: [NoIdEntity]
}`,
      ],
      [
        `input SimpleEntityInput {
stringField: String
}
input SimpleEntityIDsInput {
id: Float
}`
      ],
      [
        `input NoIdEntityInput {
stringField: String
}`
      ],
      [
        `input CoolEntityInput {
stringField: String!
boolField: Boolean
dateField: Date
numberField: Float
simpleEntity: SimpleEntityIDsInput
simpleEntityArray: [SimpleEntityIDsInput]
noIDEntity: NoIdEntityInput
noIDEntityArray: [NoIdEntityInput]
}
input CoolEntityIDsInput {
id: Float
}`
      ],
      [
        `input CreateSomethingCoolInput {
stringField: String
boolField: Boolean
dateField: Date
numberField: Float
simpleEntity: SimpleEntityIDsInput
simpleEntityArray: [SimpleEntityIDsInput]
noIDEntity: NoIdEntityInput
noIDEntityArray: [NoIdEntityInput]
}`
      ],
      [
        `input UpdateSomethingCoolInput {
id: Float
stringField: String
boolField: Boolean
dateField: Date
numberField: Float
simpleEntity: SimpleEntityIDsInput
simpleEntityArray: [SimpleEntityIDsInput]
noIDEntity: NoIdEntityInput
noIDEntityArray: [NoIdEntityInput]
}`
      ],
    ])
    assert.deepStrictEqual(
      queries[0][0],
      "extend type Query { getSomethingCool (id: Float) : CoolEntity }"
    )
    assert.deepStrictEqual(
      queries[1][0],
      "extend type Query { givenAnUseCaseThatResturnsDate (id: Float, date: Date) : Date }"
    )
    assert.deepStrictEqual(
      mutations[0][0],
      'extend type Mutation { createSomethingCool (input: CreateSomethingCoolInput): CoolEntity }'
    )
    assert.deepStrictEqual(
      mutations[1][0],
      'extend type Mutation { updateSomethingCool (input: UpdateSomethingCoolInput): CoolEntity }'
    )
  })
})
