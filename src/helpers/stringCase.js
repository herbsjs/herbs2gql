const camelCase = require("lodash/camelCase")
const startCase = require("lodash/startCase")
const kebabCase = require("lodash/kebabCase")
const lowerCase = require("lodash/lowerCase")
const snakeCase = require("lodash/snakeCase")
const upperCase = require("lodash/upperCase")

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