const moment = require("moment");
const SchemaValidator = require("../SchemaValidator");
const repositories = require("../repositories");
const couponSchema = require("../models/couponSchema");

const {isEmpty} = require("lodash");
const {isNil} = require("lodash");
const {filter} = require("lodash");
const {map} = require("lodash");

class Coupon {
      constructor() {
          this.validator = new SchemaValidator();
          this.couponRepository = new repositories.CouponRepository();
      }

      async create (data) {
          let isValid = await this.validator.validate(couponSchema, data);

          if (isEmpty(isValid.errors)) {
              return await this.couponRepository.create(data);
          } else {
              return Error("Data Not Valid")
          }
      }

      async getCouponsByEmail(email) {
          let coupons = await this.couponRepository.findFull({email: email});

          if(!isEmpty(coupons)) {

              let validCoupons = filter(coupons, coupon => {
                  if ( coupon.used ===  false && !this.isExpired(coupon.offer.expireDate))
                      return coupon
              });

              let responseData = [];
              map(validCoupons,  (coupon) => {
                  responseData.push({
                      voucher: coupon.coupon,
                      offerName: coupon.offer.name
                  })
              });

              return responseData;
          } else {
              let error = new Error();
              error.message = "no voucher found";
              return error;
          }
      }

      async redeem(couponCode, email) {
          let error = new Error();
          let coupon = await this.couponRepository.findFull({coupon: couponCode});

          if(!isEmpty(coupon) && coupon[0].user.email === email) {
              if(this.isValidateCoupon(coupon[0])) {
                    let offerDiscount = coupon[0].offer.discount;

                    coupon[0].used = true;
                    coupon[0].usedAt = moment().format('Y-MM-DD H:SS');
                    await this.couponRepository.update(coupon[0]);

                    return { discount: offerDiscount }
              } else {
                  error.message = "voucher not valid";
                  return error;
              }

          } else {
              error.message = "voucher not valid";
              return error;
          }

      }

      async import(userId, offerId) {
          let couponData = this.generateDataSchema(userId,offerId);
          return await this.create(couponData);
      }

      generateCode(){
          return Math.random().toString(36).slice(-8)
      }

      generateDataSchema(userId, offerId) {
          let coupon = this.generateCode();
          return {
              coupon: coupon,
              userId: userId,
              offerId: offerId,
              used: false,
              usedAt:""
          }
      }

      isValidateCoupon(coupon) {
          return coupon.used === false && !this.isExpired(coupon.offer.expireDate)
      }

      isExpired(expireDate) {
          let offerExpireDate =  new Date(expireDate);
          let dateNow = new Date();

          return moment(dateNow).isAfter(offerExpireDate);
      }
}

module.exports = Coupon;
