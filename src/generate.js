const { entity2type, usecase2mutation, usecase2query, defaultResolver } = require("./herbs2gql")

function generate(herbarium) {
  const { usecases, entities, crud } = herbarium

  const entitiesName = Array.from(entities.all.values()).map(e => e.entity)
  const queryUseCases = usecases
    .findBy({ operation: [crud.read, crud.readAll] })
    .map(e => e.usecase)
  const mutatitonUseCases = usecases
    .findBy({ operation: [crud.create, crud.update, crud.delete] })
    .map(e => e.usecase)

  const mutations = mutatitonUseCases.map(usecase => usecase2mutation(usecase(), defaultResolver(usecase)))
  const queries = queryUseCases.map(usecase => usecase2query(usecase(), defaultResolver(usecase)))
  const defaultSchema = [`
    type Query {
        _: Boolean
      }
    
      type Mutation {
        _: Boolean
      }`]
  const types = [defaultSchema, ...entitiesName.map(entity => [entity2type(entity)])]

  return { types, queries, mutations }
}

module.exports = generate