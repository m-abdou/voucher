const mongoDB =  require('mongodb');

const config = require('../config');

const Client = mongoDB.MongoClient;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

class MongoClient {
    static getCollection(collectionName) {
        return Client.connect(config.mongodb.url, options)
            .then((client) => client.db(config.mongodb.name).collection(collectionName));
    }
}

module.exports = MongoClient;
