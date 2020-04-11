const CouponRepository = require('../../../src/repositories').CouponRepository;
let  couponExample = require("../../resources/examples/coupon");
let  {omit}  = require('lodash');
let  {cloneDeep}  = require('lodash');
let coupon;

describe('validate on coupon repository', () => {
    let repository = new CouponRepository();
    test('test create coupon', async () => {
        let res = await repository.create(couponExample);
        coupon = cloneDeep(res);
        expect(res).toHaveProperty(['_id']);
        omit(res, ['_id']);
        expect(res).toEqual(couponExample);

    });

    test('test find coupon', async () => {
        let res = await repository.findBy({"_id": coupon._id});
        expect(res[0]).toEqual(coupon);
    });

    test('test update coupon', async () => {
        coupon.email = "mohamed@gmail.com";
        let res = await repository.update(coupon);
        expect(res).toEqual(1);
    });
});