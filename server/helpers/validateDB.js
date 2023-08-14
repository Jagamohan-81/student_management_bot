const adminModel = require("../models/adminModel");

module.exports = {
  validateDB: async (req, resp, next) => {
    try {
      const { university_id } = req.body;
      let userExist = await adminModel.findUserExistance(university_id);
      if (userExist.success) {
        return resp
          .status(409)
          .json({ status: 3, message: "User already exist" });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ status: 3, message: error.message });
    }
  },
  validateDeanDB: async (req, resp, next) => {
    try {
      const { university_id } = req.body;
      let userExist = await adminModel.findDeanExistance(university_id);
      if (userExist.success) {
        return resp
          .status(409)
          .json({ status: 3, message: "User already exist" });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      resp.status(400).json({ status: 3, message: error.message });
    }
  },
};
