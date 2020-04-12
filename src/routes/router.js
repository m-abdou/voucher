const express = require('express');

const router = express.Router();
const CouponHandler = require('../handlers').Coupon;

module.exports = function (app) {
    app.use('/api', router);
    const couponHandler = new CouponHandler();
    router.post('/voucher/fetch', async (req, res) => {
        const email = req.body.email;
        const response = await couponHandler.getCouponsByEmail(email);

        if (response instanceof Error) {
            return res.send({
                ok: false,
                status: 401,
                error: response.message,
            });

        }

        return res.send({
            ok: true,
            status: 200,
            data: response,
        });

    });


    router.post('/voucher/redeem', async (req, res) => {
        const email = req.body.email;
        const voucher = req.body.voucher;
        const response = await couponHandler.redeem(voucher, email);

        if (response instanceof Error) {
            return res.send({
                ok: false,
                status: 401,
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
