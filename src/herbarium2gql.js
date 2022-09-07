const defaultResolver = require('./defaultResolver')
const entity2type = require('./entity2type')
const usecase2mutation = require('./usecase2mutation')
const usecase2query = require('./usecase2query')

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
  ]

  return { types, queries, mutations }
}

module.exports =  herbs2gql
