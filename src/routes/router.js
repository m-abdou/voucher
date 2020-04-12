let express = require("express");
let router = express.Router();
let CouponHandler = require("../handlers").Coupon;

module.exports = function (app) {
    app.use("/api", router);
    let couponHandler = new CouponHandler();
    router.post('/fetch/voucher', async function (req, res, next) {
        let email = req.body.email;
        let response = await couponHandler.getCouponsByEmail(email);

        if(response instanceof Error) {
            return res.send({
                ok: false,
                status:401,
                error: response.message,
            });

        }

        return res.send({
            ok: true,
            status: 200,
            data: response,
        });

    });


    router.post('/redeem/voucher', async function (req, res, next) {
        let email = req.body.email;
        let voucher = req.body.voucher;
        let response = await couponHandler.redeem(voucher, email);

        if(response instanceof Error) {
            return res.send({
                ok: false,
                status:401,
                error: response.message,
            });

        }

        return res.send({
            ok: true,
            status: 200,
            data: response,
        });

    });
};