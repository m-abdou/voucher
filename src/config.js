const { get }  = require('lodash');

const envConfig = require('../.config.json');

module.exports = {
    mongodb: {
        url: get({ ...envConfig }, 'MONGO_URL', ''),
        name: get({ ...envConfig }, 'MONGO_DB_NAME', ''),
    },
};
