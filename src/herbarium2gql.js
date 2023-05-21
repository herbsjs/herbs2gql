const defaultResolver = require('./defaultResolver')
const entity2type = require('./entity2type')
const entity2input = require('./entity2input')
const usecase2mutation = require('./usecase2mutation')
const usecase2query = require('./usecase2query')
const { entity, field } = require('@herbsjs/herbs')


function  herbs2gql({herbarium, resolver = defaultResolver}) {
  const { usecases, entities, crud } = herbarium

  const entitiesName = Array.from(entities.all.values()).map((e) => e.entity)
  const queryUseCases = usecases
    .findBy({ operation: [crud.read, crud.readAll] })
    .map((e) => e.usecase)
  const mutatitonUseCases = usecases
    .findBy({ operation: [crud.create, crud.update, crud.delete] })
    .map((e) => e.usecase)

  const mutations = mutatitonUseCases.map((usecase) =>
    usecase2mutation(usecase(), resolver(usecase))
  )
  const queries = queryUseCases.map((usecase) =>
    usecase2query(usecase(), resolver(usecase))
  )
  const defaultSchema = [
    `
    type Query {
        _: Boolean
      }
    
      type Mutation {
        _: Boolean
      }`,
  ]
  const types = [
    defaultSchema,
    ...entitiesName.map((entity) => [entity2type(entity)]),
    ...entitiesName.map((entity) => [entity2input(entity)]),
    ...Array.from(usecases.all).map(([_, { id, usecase }]) => {
      const schema = usecase().requestSchema
      // convert each schema's key into a Field object
      Object.keys(schema).forEach((key) => {
        schema[key] = field(schema[key])
      })
      return [entity2input(entity(id, schema))]
    })
  ]

  return { types, queries, mutations }
}

module.exports =  herbs2gql
