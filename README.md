# herbs2gql
​
herbs2gql creates GraphQL types based on herbs entities ([gotu](https://github.com/herbsjs/gotu)) and usecases ([buchu](https://github.com/herbsjs/buchu)), based on [Apollo](https://www.apollographql.com/) GraphQL.
​
### Installing
​```
    $ npm install @herbsjs/herbs2gql
​```

### Using
​
All methods returns a string in GraphQL format representing the type based ([gql](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#gql)) and a [resolver](https://www.apollographql.com/docs/apollo-server/data/resolvers/) (when expected).
​
#### GraphQL Type
​
To convert a Herbs Entity to GraphQL Type:
​
```javascript
const { entity2type } = require('@herbsjs/herbs2gql')
​
const entity = entity('User', {
    id: field(String),
    name: field(String),
    document: field(String),
    age: field(Number),
    active: field(Boolean),
})
​
const gql = entity2type(entity)
```
​
#### GraphQL Input
​
To convert a Herbs Entity to GraphQL Input:
​
```javascript
const { entity2input } = require('@herbsjs/herbs2gql')
​
const entity = entity('UserFilter', {    
    name: field(String),    
    age: field(Number),    
})
​
const gql = entity2input(entity)
```
​
#### GraphQL Query
​
To convert a Herbs Use Case to GraphQL Query:
​
```javascript
const { usecase2query } = require('@herbsjs/herbs2gql')
​
const usecase = usecase('Get User', {
    request: {
        id: Number,
        document: String
    },
​
    response: User
})
​
const resolverFunc = (parent, args, context, info) => { }
​
const [gql, resolver] = usecase2query(usecase, resolverFunc)
```
​
#### GraphQL Mutation
​
To convert a Herbs Use Case to GraphQL Mutation:
​
```javascript
const { usecase2mutation } = require('@herbsjs/herbs2gql')
​
const usecase = usecase('Update User', {
    request: {
        id: Number,
        name: String,
        age: Number,
        active: Boolean
    },
​
    response: User
})
​
const resolverFunc = (parent, args, context, info) => { }
​
const [gql, resolver] = usecase2mutation(usecase, resolverFunc)
```
​
#### GraphQL Subscription
​
To convert a Herbs Use Case to GraphQL Subscription:
​
```javascript
const { usecase2subscription } = require('@herbsjs/herbs2gql')
​
const usecase = usecase('New User Notification', {
    request: {
        id: Number,        
    },
​
    response: UserMessage
})
​
const resolverFunc = () => { }
​
const [gql, resolver] = usecase2subscription(usecase, resolverFunc)
```
​
#### GraphQL Resolvers
​
`herbs2gql` provides a generic resolver implementation for mutations and queries.
​
```javascript
const { defaultResolver } = require('@herbsjs/herbs2gql')
​
const updateUser = (injection) => usecase('Update User', {
    request: {
        id: Number,
        name: String,
        age: Number,
        active: Boolean
    },
​
    response: User
})
​
const [gql, resolver] = usecase2mutation(updateUser(), defaultResolver(updateUser))
```
​
In case you need to implement your own resolver:
​
```javascript
const usecase = usecase('Update User', {
    request: {
        id: Number,
        name: String,
        age: Number,
        active: Boolean
    },
​
    response: User
})
​
const resolverFunc = (parent, args, context, info) => { }
​
const [gql, resolver] = usecase2mutation(usecase, resolverFunc)
```
​
Or you can use `herbs2gql` [`defaultResolver`](https://github.com/herbsjs/herbs2gql/blob/master/src/defaultResolver.js) implementation as a reference. 
​
​
#### Custom Names or Conventions
In Herbs it is possible to include personalized names for queries, mutations, inputs and types
custom names are always prioritized
​
#### Custom Names
​
```javascript
const options = { inputName: 'An-Entity' }
​
// for entity2input
const gql = entity2input(givenAnInput, options)
​
// for entity2type
const gql = entity2type(givenAnEntity, options)
​
//for mutation, query or subscription example using mutation
const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)
```
​
#### Conventions
At the convention, a function must be sent, it must return a text formatted according to the sended convention
```javascript
const options = { convention: { inputNameRule: (str) => `snake_case_returned` }}
​
// for entity2input
const gql = entity2input(givenAnInput, options)
​
// for entity2type
const gql = entity2type(givenAnEntity, options)
​
//for mutation, query or subscription example using mutation
const [gql, resolver] = usecase2mutation(givenAnUseCase, resolverFunc, options)
```
​
#### Example
​
Additionally you can view a simple demo application of this library in [todolist-on-herbs](https://github.com/herbsjs/todolist-on-herbs).
​
## How to contribute
​
If you would like to help contribute to this repository, please see [CONTRIBUTING](https://github.com/herbsjs/herbs2gql/blob/master/.github/CONTRIBUTING.md)
​
---
​
### License
​
- [MIT License](https://github.com/herbsjs/herbs2gql/blob/master/LICENSE)