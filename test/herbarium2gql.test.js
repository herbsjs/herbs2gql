const assert = require('assert');
const { herbarium } = require('./support/herbarium/genericHerbariumObject');
const { herbarium2gql } = require('../src/herbs2gql');

describe('Hebarium to GQL', () => {
  it.only('Should be able to create types, queries and mutations based on herbarium object', async () => {
    // given
    const { types, queries, mutations } = herbarium2gql(herbarium);

    // then
    assert.deepStrictEqual(types, [
      [
        '\n    type Query {\n        _: Boolean\n      }\n    \n      type Mutation {\n        _: Boolean\n      }',
      ],
      [
        'type CoolEntity {\nid: Float\ncoolField: String!\nanotherCoolField: Boolean\n}',
      ],
    ]);
    assert.deepStrictEqual(
      queries[0][0],
      'extend type Query { getSomethingCool (id: Float) : CoolEntity }'
    );
    assert.deepStrictEqual(
      mutations[0][0],
      'extend type Mutation { createSomethingCool (arrayField: [CoolEntityInput]) : Boolean }'
    );
  });
});
