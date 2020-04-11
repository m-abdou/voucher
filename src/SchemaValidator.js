const {Validator} = require("jsonschema");

class SchemaValidator {

    validate(schema, object){
        let validator = new Validator();
        return validator.validate(object,schema)
            .then(result => result)
            .catch(result => console.log(result))
    }
}


module.exports = SchemaValidator;