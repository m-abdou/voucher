const moment = require('moment');

const { isEmpty } = require('lodash');
const { filter } = require('lodash');
const { map } = require('lodash');
const couponSchema = require('../models/couponSchema');
const repositories = require('../repositories');
const SchemaValidator = require('../SchemaValidator');


class Coupon {
      constructor() {
          this.validator = new SchemaValidator();
          this.couponRepository = new repositories.CouponRepository();
      }

      async create(data) {
          const isValid = await this.validator.validate(couponSchema, data);

          if (isEmpty(isValid.errors)) {
              return this.couponRepository.create(data);
          }
              return Error('Data Not Valid');

      }

      async getCouponsByEmail(email) {
          const coupons = await this.couponRepository.findFull({ email });

          if (!isEmpty(coupons)) {

              const validCoupons = filter(coupons, (coupon) => {
                  if (coupon.used === false && !this.isExpired(coupon.offer.expireDate)) return coupon;
              });

              const responseData = [];
              map(validCoupons, (coupon) => {
                  responseData.push({
                      voucher: coupon.coupon,
                      offerName: coupon.offer.name,
                  });
              });

              return responseData;
          }
              const error = new Error();
              error.message = 'no voucher found';
              return error;

      }

      async redeem(couponCode, email) {
          const error = new Error();
          const coupon = await this.couponRepository.findFull({ coupon: couponCode });

          if (!isEmpty(coupon) && coupon[0].user.email === email) {
              if (this.isValidateCoupon(coupon[0])) {
                    const offerDiscount = coupon[0].offer.discount;

                    coupon[0].used = true;
                    coupon[0].usedAt = moment().format('Y-MM-DD H:SS');
                    await this.couponRepository.update(coupon[0]);

                    return { discount: offerDiscount };
              }
                  error.message = 'voucher not valid';
                  return error;


          }
              error.message = 'voucher not valid';
              return error;


      }

      async import(userId, offerId) {
          const couponData = this.generateDataSchema(userId, offerId);
          return this.create(couponData);
      }

      generateCode() {
          return Math.random().toString(36).slice(-8);
      }

      generateDataSchema(userId, offerId) {
          const coupon = this.generateCode();
          return {
              coupon,
              userId,
              offerId,
              used: false,
              usedAt: '',
          };
      }

      isValidateCoupon(coupon) {
          return coupon.used === false && !this.isExpired(coupon.offer.expireDate);
      }

      isExpired(expireDate) {
          const offerExpireDate =  new Date(expireDate);
          const dateNow = new Date();

          return moment(dateNow).isAfter(offerExpireDate);
      }
}

module.exports = Coupon;
