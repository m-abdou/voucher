const SchemaValidator = require("../SchemaValidator");
const repositories = require("../repositories");
const userSchema = require("../models/userSchema");
const {map} = require("lodash");
const {isEmpty} = require("lodash");

class User {
    constructor() {
        this.validator = new SchemaValidator();
        this.userRepository = new repositories.UserRepository();
    }

    async create (data) {
        let isValid = await this.validator.validate(userSchema, data);

        if (isEmpty(isValid.errors)) {
            return await this.userRepository.create(data);
        } else {
            return Error("data not valid")
        }
    }

    async import(users){
        return Promise.all(map(users, async (user) =>
            await this.create(user)
        ));
    }

}

module.exports = User;

