const { camelCase, startCase, kebabCase, lowerCase, snakeCase, upperCase } = require("lodash")

function pascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '')
}

function kebabCaseConvection(str) {
    return kebabCase(str)
}

function lowerCaseConvection(str) {
    return lowerCase(str)
}

function snakeCaseConvection(str) {
    return snakeCase(str)
}

function startCaseConvection(str) {
    return startCase(str)
}

function upperCaseConvention(str) {
    return upperCase(str)
}

module.exports = { 
    pascalCase, 
    kebabCaseConvection,
    lowerCaseConvection,
    snakeCaseConvection,
    startCaseConvection,
    upperCaseConvention
}