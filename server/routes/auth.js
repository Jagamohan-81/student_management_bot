const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const { validateBody, schemas } = require("../helpers/bodyValidate");
const { validateDB, validateDeanDB } = require("../helpers/validateDB");
const {
  studentLogin,
  studentRegister,
} = require("../controllers/studentController");

const { deanRegister, deanLogin } = require("../controllers/deanController");
//student auth
router.post(
  "/student-registration",
  validateBody(schemas.userRegistraionSchema),
  validateDB,
  studentRegister
);
router.post(
  "/student-login",
  validateBody(schemas.userLoginSchema),
  studentLogin
);

//dean auth
router.post(
  "/dean-registration",
  validateBody(schemas.userRegistraionSchema),
  validateDeanDB,
  deanRegister
);
// Dean login
router.post("/dean-login", validateBody(schemas.userLoginSchema), deanLogin);

module.exports = router;
