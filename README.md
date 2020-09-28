# herbs2gql

herbs2gql creates graphql apollo types based on herbs entities (gotu) and herbs usecase (buchu)

### Installing

$ npm install herbs2gql

### Using

All methods returns a string in GraphQl format representing the type based.

To convert a herbs entity to GraphQl Type:

```
const entity = entity('User', {
    id: field(String),
    name: field(String),
    document: field(String),
    age: field(Number),
    active: field(Boolean),
})

const gql = entity2type(entity)
```

To convert a herbs entity to GraphQl Input:

```
const entity = entity('UserFilter', {    
    name: field(String),    
    age: field(Number),    
})

const gql = entity2input(entity)
```

To convert a usecase to GraphQl Query:

```
const usecase = usecase('Get User', {
    request: {
        id: Number,
        document: String
    },

    response: User
})

const gql = usecase2query(usecase)
```

To convert a usecase to GraphQL Mutation:

```
const usecase = usecase('Update User', {
    request: {
        id: Number,
        name: String,
        age: Number,
        active: Boolean
    },

    response: User
})

const gql = usecase2mutation(usecase)
```

To convert a usecase to GraphQL Subscription:

```
const usecase = usecase('New User Notification', {
    request: {
        id: Number,        
    },

    response: UserMessage
})

const gql = usecase2mutation(usecase)
```

Additionally you can view a simple demo application of this library in [todolist-on-herbs](https://github.com/herbsjs/todolist-on-herbs).