const { camelCase, startCase } = require("lodash")

function pascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '');
}

module.exports = { pascalCase }