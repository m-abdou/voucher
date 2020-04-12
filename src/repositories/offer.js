const { pick }  = require('lodash');
const MongoClient = require('../clients/mongoClient');

class Offer {
    constructor() {
        this.collection = MongoClient.getCollection('offer');
    }

    create(schema) {
        return this.collection
            .then((collection) => collection.insertOne(schema))
            .then((result) => result.ops[0]);
    }

    update(schema) {
        const filter = pick(schema, ['_id']);

        const doc = {
            $set: schema,
        };
        return this.collection
            .then((collection) => collection.updateOne(filter, doc))
            .then((result) => result.matchedCount);
    }

    findBy(filter) {
        return this.collection
            .then((collection) => collection.find(filter))
            .then((cursor) => cursor.toArray())
            .then((result) => result);
    }
}

module.exports = Offer;
