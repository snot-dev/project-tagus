var _testRequiredFields = function(item, requiredProperties) {
    requiredProperties.forEach(function(property) {
        item.should.have.property(property);
    });
};

module.exports = {
    testRequiredFields: _testRequiredFields
};
