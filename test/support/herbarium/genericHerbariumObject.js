const { herbarium } = require('@herbsjs/herbarium')
const { entity, field, id, usecase } = require('@herbsjs/herbs')

const CoolEntity = entity('CoolEntity', {
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
})

const givenAPostUseCase = (injection) =>
  usecase('CreateSomethingCool', {
    request: {
      coolEntity: [CoolEntity],
    },
    response: Boolean,
  })

const givenAGetUseCase = (injection) =>
  usecase('GetSomethingCool', {
    request: {
      id: Number,
    },
    response: CoolEntity,
  })

  const givenAnUseCaseThatResturnsDate = (injection) =>
  usecase('givenAnUseCaseThatResturnsDate', {
    request: {
      id: Number,
      date: Date
    },
    response: Date,
  })

herbarium.entities.add(CoolEntity, 'CoolEntity').entity
herbarium.usecases.add(givenAPostUseCase, 'CreateSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.create,
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
