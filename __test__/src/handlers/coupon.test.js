const ObjectID = require('mongodb').ObjectID;
const CouponHandler = require('../../../src/handlers').Coupon;

let couponExample = require("../../resources/examples/coupon");
let {cloneDeep}  = require('lodash');
let {repeat}  = require('lodash');

describe('test Coupon Handler', () => {
    let handler = new CouponHandler();

    test('test create coupons', async () => {
        let coupon = cloneDeep(couponExample);
        coupon.userId = new ObjectID(repeat('f', 24));
        coupon.offerId = new ObjectID(repeat('f', 24));
        let res = await handler.create(coupon);

        expect(res).toHaveProperty(['_id']);
    });

    test('test fail create coupons', async () => {
        let coupon = cloneDeep(couponExample);
        coupon.userId = new ObjectID(repeat('f', 24));
        let res = await handler.create(coupon);
        expect(res).toBeInstanceOf(Error);
    });

    test('test get valid coupons', async () => {
        let res = await handler.getCouponsByEmail("test@gmail.com");
        console.log(res);
    });

    test('test redeem coupons', async () => {
        let res = await handler.redeem("43vchvep","test@gmail.com");
        // console.log(res);
    });

    test("test date must be not expired", () => {
        let res = handler.isExpired("2020-04-15");
        expect(res).toEqual(false);
    });

    test("test date must be expired", () => {
        let res = handler.isExpired("2020-04-11");
        expect(res).toEqual(true);
    });

    test("test generate code", () => {
        let res = handler.generateCode();
        expect(res).toHaveLength(8);
    });
});