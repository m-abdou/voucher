const { map } = require('lodash');
const { isEmpty } = require('lodash');
const SchemaValidator = require('../SchemaValidator');
const repositories = require('../repositories');
const offerSchema = require('../models/offerSchema');

class Offer {
    constructor() {
        this.validator = new SchemaValidator();
        this.offerRepository = new repositories.OfferRepository();
    }

    async create(data) {
        const isValid = await this.validator.validate(offerSchema, data);

        if (isEmpty(isValid.errors)) {
            return this.offerRepository.create(data);
        }
            return Error('data not valid');

    }

    async import(offers) {
        return Promise.all(map(offers, async (offer) => this.create(offer)));
    }

}

module.exports = Offer;
