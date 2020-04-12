const SchemaValidator = require("../SchemaValidator");
const repositories = require("../repositories");
const offerSchema = require("../models/offerSchema");
const {map} = require("lodash");
const {isEmpty} = require("lodash");

class Offer {
    constructor() {
        this.validator = new SchemaValidator();
        this.offerRepository = new repositories.OfferRepository();
    }

    async create (data) {
        let isValid = await this.validator.validate(offerSchema, data);

        if (isEmpty(isValid.errors)) {
            return await this.offerRepository.create(data);
        } else {
            return Error("data not valid")
        }
    }

    async import(offers){
        return Promise.all(map(offers, async (offer) =>
            await this.create(offer)
        ));
    }

}

module.exports = Offer;

