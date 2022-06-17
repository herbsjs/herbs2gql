const { herbarium } = require('@herbsjs/herbarium')
const { entity, field, id, usecase } = require('@herbsjs/herbs')

const CoolEntity = entity('CoolEntity', {
  id: id(Number),
  coolField: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  anotherCoolField: field(Boolean, {
    default: false,
  }),
})

const givenAMutationUseCase = (injection) =>
  usecase('CreateSomethingCool', {
    request: {
      arrayField: [CoolEntity],
    },
    response: Boolean,
  })

const givenAQueryUseCase = (injection) =>
  usecase('GetSomethingCool', {
    request: {
      id: Number,
    },
    response: CoolEntity,
  })

herbarium.entities.add(CoolEntity, 'CoolEntity').entity
herbarium.usecases.add(givenAMutationUseCase, 'CreateSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.create,
  entity: CoolEntity,
})
herbarium.usecases.add(givenAQueryUseCase, 'GetSomethingCool').metadata({
  group: 'genericGroup',
  operation: herbarium.crud.read,
  entity: CoolEntity,
})

module.exports = { herbarium }
