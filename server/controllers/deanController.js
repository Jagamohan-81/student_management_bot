const adminModal = require("../models/adminModel");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const uuid = require("uuid");
module.exports = {
  deanRegister: async (req, res) => {
    try {
      const { name, university_id, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await adminModal
        .deanRegisterModel({
          name,
          university_id,
          password: hashedPassword,
        })
        .then((data) => {
          if (data.id) {
            res.status(200).json({
              status: "OK",
              message: "Dean registered successfully",
            });
          }
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 3, message: error }).end();
    }
  },
  deanLogin: async (req, res, next) => {
    try {
      const { university_id, password } = req.body;
      const userData = await adminModal.deanLogIn(university_id);
      if (userData) {
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (passwordMatch) {
          const token = uuid.v4();
          await adminModal.insertToken({
            id: userData.id,
            token,
          });
          res.status(200).json({
            status: "OK",
            data: { university_id: university_id },
            message: "Login successful",
            token,
          });
          next();
        } else {
          res.status(401).json({
            status: 4,
            message: "Invalid credentials",
          });
        }
      } else {
        res.status(401).json({ status: 4, message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 4, message: "An error occurred" }).end();
    }
  },
};
