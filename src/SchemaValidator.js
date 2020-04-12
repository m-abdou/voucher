const {Validator} = require("jsonschema");

class SchemaValidator {

    validate(schema, object){
        let validator = new Validator();
        return validator.validate(object,schema)
    }
}

module.exports = SchemaValidator;