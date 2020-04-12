const { map } = require('lodash');
const { isEmpty } = require('lodash');
const SchemaValidator = require('../SchemaValidator');
const repositories = require('../repositories');
const userSchema = require('../models/userSchema');

class User {
    constructor() {
        this.validator = new SchemaValidator();
        this.userRepository = new repositories.UserRepository();
    }

    async create(data) {
        const isValid = await this.validator.validate(userSchema, data);

        if (isEmpty(isValid.errors)) {
            return this.userRepository.create(data);
        }
            return Error('data not valid');

    }

    async import(users) {
        return Promise.all(map(users, async (user) => this.create(user)));
    }

}

module.exports = User;
