const { Validator } = require('jsonschema');

class SchemaValidator {
    validate(schema, object) {
        const validator = new Validator();
        return validator.validate(object, schema);
    }
}

module.exports = SchemaValidator;
