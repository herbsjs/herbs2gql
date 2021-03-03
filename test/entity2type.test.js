const assert = require("assert")
const { entity, field } = require("gotu")
const { entity2type } = require("../src/herbs2gql")
describe("Entity 2GQL Type", () => {

  context('when entity is valid', () => {
    it("should convert an entity to type", async () => {
      // given
      const givenAnEntity = entity("Entity", {
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
        customEntityFunction: function(){}        
      })

      // when
      const gql = entity2type(givenAnEntity)

      // then
      assert.deepStrictEqual(
        gql,
        `type Entity {
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

    it("should convert an entity to type with not camel case", async () => {
      // given
      const givenAnEntity = entity("entitY", {
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
        customEntityFunction: function(){}        
      })

      // when
      const gql = entity2type(givenAnEntity, false)

      // then
      assert.deepStrictEqual(
        gql,
        `type entitY {
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

    it("should convert an entity to type with custom name", async () => {
      // given
      const givenAnEntity = entity("entitY", {
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
        customEntityFunction: function(){}        
      })

      // when
      const gql = entity2type(givenAnEntity, false, 'EntityCustom')

      // then
      assert.deepStrictEqual(
        gql,
        `type EntityCustom {
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

    it("should convert an entity with long name to type", async () => {
      // given
      const givenAnEntity = entity("Chield Entity GQL", {
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
      const gql = entity2type(givenAnEntity)

      // then
      assert.deepStrictEqual(
        gql,
        `type ChieldEntityGql {
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

    it("should convert an entity to type when entity has entity references", async () => {
      // given
      const givenAnFirstEntity = entity("Entity One", {
        numberField: field(Number),
        customEntityFunction: function(){}        
      })

      const givenAnSecondEntity = entity("Entity Two", {        
        entityField: field(givenAnFirstEntity),
        customEntityFunction: function(){}        
      })

      // when
      const gql = `${entity2type(givenAnFirstEntity)}
      ${entity2type(givenAnSecondEntity)}`

      // then
      assert.deepStrictEqual(
        gql,
        `type EntityOne {
numberField: Float
}
      type EntityTwo {
entityField: EntityOne
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
      assert.throws(() => entity2type(givenAnEntity), {
        invalidArgs: {
          entityName: [{ cantBeEmpty: true }]
        }
      })
    })

  })

})
