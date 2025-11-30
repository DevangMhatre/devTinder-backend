const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Required to be filled");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoURL",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowed;
};

const validatePassword = (req) => {
  const noSpaceRegex = /^\S+$/;

  return (
    Object.keys(req.body).length === 1 &&
    req.body.hasOwnProperty("password") &&
    noSpaceRegex.test(req.body.password)
  );
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
  validatePassword,
};
