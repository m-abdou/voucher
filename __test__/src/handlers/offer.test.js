const OfferHandler = require('../../../src/handlers').Offer;
let offerExample = require("../../resources/examples/offer");

let {omit}  = require('lodash');
let {cloneDeep}  = require('lodash');
let offer;

describe('test offer handler', () => {
    let offerHandler = new OfferHandler();

    test('test create offer with schema', async () => {
        let res = await offerHandler.create(offerExample);
        expect(res).toHaveProperty(['_id']);
        omit(res, ['_id']);
        expect(res).toEqual(offerExample);

    });

    test('test fail create offer with invalid schema', async () => {
        offer = cloneDeep(offerExample);
        offer.discount = "test";

        let res = await offerHandler.create(offer);
        expect(res).toBeInstanceOf(Error);
    });

});
