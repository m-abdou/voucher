const  offerRepository = require('../../../src/repositories').OfferRepository;
let offerExample = require("../../resources/examples/offer");

let {omit}  = require('lodash');
let {cloneDeep}  = require('lodash');
let offer;

describe('validate on offer repository', () => {
    let repository = new offerRepository();
    test('test create offer', async () => {
        let res = await repository.create(offerExample);
        offer = cloneDeep(res);
        expect(res).toHaveProperty(['_id']);
        omit(res, ['_id']);
        expect(res).toEqual(offerExample);

    });

    test('test find offer', async () => {
        let res = await repository.findBy({"_id": offer._id});
        expect(res[0]).toEqual(offer);
    });

    test('test update offer', async () => {
        offer.name = "test offer";
        let res = await repository.update(offer);
        expect(res).toEqual(1);
    });
});
