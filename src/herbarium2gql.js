const defaultResolver = require('./defaultResolver')
const entity2type = require('./entity2type')
const entity2input = require('./entity2input')
const usecase2mutation = require('./usecase2mutation')
const usecase2query = require('./usecase2query')
const usecase2input = require('./usecase2input')
const { entity, field } = require('@herbsjs/herbs')


function  herbs2gql({herbarium, resolver = defaultResolver}) {
  const usecases = herbarium.nodes.find({ type: herbarium.node.usecase })
  const entities = herbarium.nodes.find({ type: herbarium.node.entity })
  const crud = herbarium.crud

  const entitiesName = entities.map((e) => e.value)
  const queryUseCases = usecases
    // find all usecases that are read or readAll
    .filter((uc) => [crud.read, crud.readAll].includes(uc?.metadatas?.operation))
    .map((e) => e.value)
  const mutatitonUseCases = usecases
    // .findBy({ operation: [crud.create, crud.update, crud.delete] })
    .filter((uc) => [crud.create, crud.update, crud.delete].includes(uc?.metadatas?.operation))
    .map((e) => e.value)

  const inputs = mutatitonUseCases.map((usecase) =>
    [usecase2input(usecase(), resolver(usecase))]
  )

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
    ...inputs
  ]

  return { types, queries, mutations }
}

module.exports =  herbs2gql
