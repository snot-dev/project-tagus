const S = require('string');

const convertToAlias = name => {
    return S(name).slugify().camelize().s;
};

const convertToUrl = name => {
    return S(name).slugify().s;
}

module.exports  = {
    convertToAlias,
    convertToUrl
};