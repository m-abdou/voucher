const MongoClient = require("../clients/mongoClient");
let  {pick}  = require('lodash');

class User {
    constructor() {
        this.collection = MongoClient.getCollection("user");
    }

    create(schema) {
        return this.collection
            .then(collection => collection.insertOne(schema))
            .then(result => result.ops[0]);
    }

    update (schema){
        let filter = pick(schema, ["_id"]);
        let doc = {
            $set: schema
        };

        return this.collection
            .then(collection => collection.updateOne(filter,doc))
            .then(result => result.matchedCount);
    }

    findBy(filter) {
        return this.collection
            .then(collection => collection.find(filter))
            .then(cursor => cursor.toArray())
            .then(result => result);
    }
}

module.exports = User;