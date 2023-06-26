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

herbarium.entities.add(SimpleEntity, 'SimpleEntity')
herbarium.entities.add(NoIDEntity, 'NoIDEntity')
herbarium.entities.add(CoolEntity, 'CoolEntity')
herbarium.usecases.add(givenACreateUseCase, 'CreateSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.create,
  entity: CoolEntity,
})
herbarium.usecases.add(givenAUpdateUseCase, 'UpdateSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.update,
  entity: CoolEntity,
})
herbarium.usecases.add(givenAGetUseCase, 'GetSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.read,
  entity: CoolEntity,
})
herbarium.usecases.add(givenAnUseCaseThatResturnsDate, 'givenAnUseCaseThatResturnsDate').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.read,
})

module.exports = { herbarium }
