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
        "\n    type Query {\n        _: Boolean\n      }\n    \n      type Mutation {\n        _: Boolean\n      }",
      ],
      [
        "type CoolEntity {\nid: Float\nstringField: String!\nboolField: Boolean\ndateField: Date\nnumberField: Float\n}",
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
      'extend type Mutation { createSomethingCool (coolEntity: [CoolEntityInput]) : Boolean }'
    )
  })
})
