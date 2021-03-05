const { camelCase, startCase, upperFirst } = require("lodash")

function pascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '')
}

function defaultConvention(str) {
    return upperFirst(camelCase(str))
}

module.exports = { pascalCase, defaultConvention }