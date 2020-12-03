# herbs2gql

herbs2gql creates GraphQL [apollo](https://www.apollographql.com/) types based on herbs entities ([gotu](https://github.com/herbsjs/gotu)) and herbs usecase ([buchu](https://github.com/herbsjs/buchu))

### Installing

    $ npm install herbs2gql

### Using

All methods returns a string in GraphQL format representing the type based.

#### GraphQL Type

To convert a Herbs Entity to GraphQL Type:

```javascript
const entity = entity('User', {
    id: field(String),
    name: field(String),
    document: field(String),
    age: field(Number),
    active: field(Boolean),
})

const gql = entity2type(entity)
```

#### GraphQL Input

To convert a Herbs Entity to GraphQL Input:

```javascript
const entity = entity('UserFilter', {    
    name: field(String),    
    age: field(Number),    
})

const gql = entity2input(entity)
```

#### GraphQL Query

To convert a Herbs Use Case to GraphQL Query:

```javascript
const usecase = usecase('Get User', {
    request: {
        id: Number,
        document: String
    },

    response: User
})

const gql = usecase2query(usecase)
```

#### GraphQL Mutation

To convert a Herbs Use Case to GraphQL Mutation:

```javascript
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

#### GraphQL Subscription

To convert a Herbs Use Case to GraphQL Subscription:

```javascript
const usecase = usecase('New User Notification', {
    request: {
        id: Number,        
    },

    response: UserMessage
})

const gql = usecase2mutation(usecase)
```

#### Example

Additionally you can view a simple demo application of this library in [todolist-on-herbs](https://github.com/herbsjs/todolist-on-herbs).

## How to contribute

If you would like to help contribute to this repository, please see [CONTRIBUTING](https://github.com/herbsjs/herbs2gql/blob/master/.github/CONTRIBUTING.md)

---

### License

- [MIT License](https://github.com/herbsjs/herbs2gql/blob/master/LICENSE)
