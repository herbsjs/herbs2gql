const { entity, field } = require('@herbsjs/gotu')

const User = 
    entity('User', {
        name: field(String),
        lastAccess: field(Date),
        accessCount: field(Number),
        hasAccess: field(Boolean),
    })

module.exports = User