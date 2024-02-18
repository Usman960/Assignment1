// simple-api/validation/register.js
const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

module.exports = function checkSignupFields(data) {
  // An errors object is created
  let errors = {};

  // If data.email is not empty, data.email = data.email
  // else if empty, data.email = ""
  data.email = !ifEmpty(data.email) ? data.email : "";
  data.password = !ifEmpty(data.password) ? data.password : "";
  data.fullName = !ifEmpty(data.fullName) ? data.fullName : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 120 })) {
    errors.password = "Passwords must be greater than 8 characters";
  }
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Fullname is required";
  }
  if (!Validator.isLength(data.fullName, {min: 3, max: 120})) {
    errors.fullName = "Fullname must be greater than 3 characters";
  }
 
  // Return the errors from the checkRegistrationFields function
  // and use the ifEmpty function to check if the errors object is empty
  return {
    errors,
    isValid: ifEmpty(errors),
  };
};