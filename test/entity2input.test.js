const assert = require("assert")
const { entity, field } = require("@herbsjs/gotu")
const { entity2input } = require("../src/herbs2gql")

describe("Entity 2GQL Input", () => {

  context('when entity is valid', () => {
    it("should convert an entity to input", async () => {
      // given
      const givenAnInput = entity("An Entity", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      // when
      const gql = entity2input(givenAnInput)

      // then
      assert.deepStrictEqual(
        gql,
        `input AnEntityInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

     it("should convert an entity to input when entity has entity references", async () => {
      // given
      const givenAnFirstEntity = entity("Entity One", {
        numberField: field(Number),
        customEntityFunction: function () { }
      })

      const givenAnSecondEntity = entity("Entity Two", {
        entityField: field(givenAnFirstEntity),
        entityList: field([givenAnFirstEntity]),
        customEntityFunction: function () { }
      })

      // when
      const gql = `${entity2input(givenAnFirstEntity)}
      ${entity2input(givenAnSecondEntity)}`
      

      // then
      assert.deepStrictEqual(
        gql,
        `input EntityOneInput {
numberField: Float
}
      input EntityTwoInput {
entityField: EntityOneInput
entityList: [EntityOneInput]
}`
      )
    }) 
  

    it("should convert an entity to input with convention", async () => {
      // given
      const givenAnInput = entity("An Entity", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      const options = { convention: { inputNameRule:(str) => `snake_case_${str}` }}
      
      // when
      const gql = entity2input(givenAnInput, options)

      // then
      assert.deepStrictEqual(
        gql,
        `input snake_case_An EntityInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

    it("should convert an entity to input with custom name", async () => {
      // given
      const givenAnInput = entity("An-Entity-", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date]),
        customEntityFunction: function () { }
      })

      const options = {inputName: 'An-Entity'}
      // when
      const gql = entity2input(givenAnInput, options)

      // then
      assert.deepStrictEqual(
        gql,
        `input An-EntityInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

    it("should convert a input with long name to type", async () => {
      // given
      const givenAnInput = entity("Chield GQL ", {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date])
      })

      // when
      const gql = entity2input(givenAnInput)

      // then
      assert.deepStrictEqual(
        gql,
        `input ChieldGqlInput {
stringField: String
stringArrayField: [String]
numberField: Float
numberArrayField: [Float]
stringWithPresence: String!
stringArrayWithPresence: [String]!
booleanField: Boolean
booleanArrayField: [Boolean]
dateField: Date
dateArrayField: [Date]
}`
      )
    })

  })

  context('when entity is invalid', () => {

    it('should throw error if entity name is empty', async () => {
      // given
      const givenAnEntity = entity('', {
        stringField: field(String),
        stringArrayField: field([String]),
        numberField: field(Number),
        numberArrayField: field([Number]),
        stringWithPresence: field(String, {
          validation: { presence: true },
        }),
        stringArrayWithPresence: field([String], {
          validation: { presence: true },
        }),
        booleanField: field(Boolean),
        booleanArrayField: field([Boolean]),
        dateField: field(Date),
        dateArrayField: field([Date])
      })

      // then
      assert.throws(() => entity2input(givenAnEntity), {
        invalidArgs: {
          entityName: [{ cantBeEmpty: true }]
        }
      })
    })

  })

})
