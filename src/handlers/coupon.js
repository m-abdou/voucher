import SchemaValidator from "../SchemaValidator";
import repositories from "../repositories";

export default class Coupon {
      constructor() {
          this.validator = new SchemaValidator();
          this.couponRepository = new repositories.CouponRepository();
          this.userRepository = new repositories.CouponRepository();
          this.offerRepository = new repositories.CouponRepository();
      }

      create (data) {

      }
}