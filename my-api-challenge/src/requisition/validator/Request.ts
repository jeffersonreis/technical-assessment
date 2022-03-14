import { body } from "express-validator";

class RequisitionValidator {
  checkUpdateUser() {
    return [body("userId").notEmpty().withMessage("User Id is Required")];
  }
}

export default new RequisitionValidator();
