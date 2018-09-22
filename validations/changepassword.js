const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateChangePassword(data) {
  let errors = {};

  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.confirmpassword = !isEmpty(data.confirmpassword)
    ? data.confirmpassword
    : "";

  if (Validator.isEmpty(data.oldpassword)) {
    errors.password = "Old Password field is required";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "new password field is required";
  }

  if (!Validator.equals(data.newpassword, data.confirmpassword)) {
    errors.confirmpassword = "Passwords must match";
  }

  if (Validator.isEmpty(data.confirmpassword)) {
    errors.confirmpassword = "Confirm Password field is required";
  }

  return {
    errors,
    noErrors: isEmpty(errors)
  };
};
