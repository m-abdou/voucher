const MongoClient = require("../clients/mongoClient");
let  {pick}  = require('lodash');
let  {isNil}  = require('lodash');


class Coupon {
    constructor() {
        this.collection = MongoClient.getCollection("coupon");
    }

    create(schema) {
        return this.collection
            .then(collection => collection.insertOne(schema))
            .then(result => result.ops[0])
            .catch(error => error);
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

    findFull(filter) {
        let matchCoupon = {};
        if(!isNil(filter.coupon)) {
            matchCoupon = {
                "coupon": { "$eq": filter.coupon }
            };
        }
        let matchEmail = {};
        if(!isNil(filter.email)) {
            matchEmail = {
                "user.email" : filter.email
            }
        }

        return this.collection
            .then(collection =>
                collection.aggregate([
                    {
                        $match: matchCoupon,
                    },
                    {
                        $lookup: {
                            from: 'offer',
                            localField: 'offerId',
                            foreignField: '_id',
                            as: 'offer',
                        }
                    },
                    {
                        $unwind: "$offer"
                    },
                    {
                        $lookup: {
                            from: 'user',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $match: matchEmail
                    }

                ])
            )
            .then(cursor => cursor.toArray())
            .then(result => result);
    }
}

module.exports = Coupon;