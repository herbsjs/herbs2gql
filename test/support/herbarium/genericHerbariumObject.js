const { herbarium } = require('@herbsjs/herbarium')
const { entity, field, id, usecase, request } = require('@herbsjs/herbs')

const SimpleEntity = entity('Simple Entity', {
  id: id(Number),
  stringField: field(String),
})

const NoIDEntity = entity('No ID Entity', {
  stringField: field(String),
})

const CoolEntity = entity('Cool Entity', {
  id: id(Number),
  stringField: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  boolField: field(Boolean, {
    default: false,
  }),
  dateField: field(Date, {
    default: false,
  }),
  numberField: field(Number, {
    default: false,
  }),
  simpleEntity: field(SimpleEntity),
  simpleEntityArray: field([SimpleEntity]),
  noIDEntity: field(NoIDEntity),
  noIDEntityArray: field([NoIDEntity]),
})

const givenACreateUseCase = (injection) =>
  usecase('Create Something Cool', {
    request: request.from(CoolEntity, { ignoreIDs: true }),
    response: CoolEntity,
  })

const givenAUpdateUseCase = (injection) =>
  usecase('Update Something Cool', {
    request: request.from(CoolEntity),
    response: CoolEntity,
  })

const givenAGetUseCase = (injection) =>
  usecase('Get Something Cool', {
    request: {
      id: Number,
    },
    response: CoolEntity,
  })

const givenAnUseCaseThatResturnsDate = (injection) =>
  usecase('Given An Use Case That Resturns Date', {
    request: {
      id: Number,
      date: Date
    },
    response: Date,
  })

herbarium.nodes.add('SimpleEntity', SimpleEntity, herbarium.node.entity)
herbarium.nodes.add('NoIDEntity', NoIDEntity, herbarium.node.entity)
herbarium.nodes.add('CoolEntity', CoolEntity, herbarium.node.entity)
herbarium.nodes.add('CreateSomethingCool', givenACreateUseCase, herbarium.node.usecase)
  .metadata({ operation: herbarium.crud.create })
  .link('CoolEntity')
herbarium.nodes.add('UpdateSomethingCool', givenAUpdateUseCase, herbarium.node.usecase)
  .metadata({ operation: herbarium.crud.update })
  .link('CoolEntity')
herbarium.nodes.add('GetSomethingCool', givenAGetUseCase, herbarium.node.usecase)
  .metadata({ operation: herbarium.crud.read })
  .link('CoolEntity')
herbarium.nodes.add('givenAnUseCaseThatResturnsDate', givenAnUseCaseThatResturnsDate, herbarium.node.usecase)
  .metadata({ operation: herbarium.crud.read })

module.exports = { herbarium }
