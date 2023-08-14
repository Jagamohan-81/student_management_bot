const { join } = require("bluebird");
const Joi = require("joi");
const { as } = require("pg-promise");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { value, error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        let err_msg = {};
        for (let counter in error.details) {
          let k = error.details[counter].context.key;
          let val = error.details[counter].message;
          err_msg[k] = val;
        }
        // console.log("eror", err_msg);
        return res.status(400).json({ status: 400, errors: err_msg });
      }

      // console.log(req.value);
      if (!req.value) {
        req.value = {};
      }
      req.value = value;

      next();
    };
  },

  schemas: {
    userRegistraionSchema: Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        "string.base": "name should be a string",
        "string.empty": "name is required",
        "string.min": "name should be at least {#limit} characters long",
        "string.max": "name should not exceed {#limit} characters",
        "any.required": "name is required",
      }),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.base": "Password should be a string",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must have at least 8 characters, with one of ,lowercase letter,uppercase letter,digit,special character",
          "any.required": "Password is required",
        }),
      university_id: Joi.string().min(3).max(30).required().messages({
        "string.base": "University ID should be a string",
        "string.empty": "University ID is required",
        "string.min":
          "University ID should be at least {#limit} characters long",
        "string.max": "University ID should not exceed {#limit} characters",
        "any.required": "University ID is required",
      }),
    }),
    userLoginSchema: Joi.object({
      university_id: Joi.string().required().messages({
        "string.base": "University ID should be a string",
        "string.empty": "University ID is required",
        "any.required": "University ID is required",
      }),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          )
        )
        .required()
        .messages({
          "string.base": "Password should be a string",
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must have at least 8 characters, with one of ,lowercase letter,uppercase letter,digit,special character",
          "any.required": "Password is required",
        }),
    }),
  },
};
