const adminModal = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { json } = require("express");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
module.exports = {
  freeSesssions: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const student = await adminModal.getUserIDFromToken(token);
      const id = student.user_id;
      if (id) {
        const freeSessions = await adminModal.getFreeSessions(id);
        if (freeSessions && freeSessions.length > 0) {
          return res.status(200).json({
            status: "OK",
            message: "Sessions available",
            sessions: freeSessions,
          });
        }

        return res.status(201).json({
          message: "No session available to book",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 3, message: error }).end();
    }
  },
  bookSession: async (req, res) => {
    try {
      const sessionID = req.params.sessionID;
      const token = req.headers.authorization.split(" ")[1];
      console.log("token", token);
      const student = await adminModal.getUserIDFromToken(token);
      const studentID = student.user_id;
      if (studentID) {
        await adminModal
          .bookSession({
            studentID,
            sessionID,
          })
          .then((data) => {
            if (data == null) {
              return res.status(200).json({
                status: "Failed",
                message: "Booking already exists for this session and student.",
              });
            }
            if (data.status == "OK") {
              return res.status(200).json({
                status: "OK",
                message: "Session booked successfully",
                booking_id: data.id,
              });
            }
            return res
              .status(400)
              .json({ status: "Failed", message: "Session booking failed !" });
          });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", message: "An error occurred" });
    }
  },
  pendingSessions: async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const dean = await adminModal.getUserIDFromToken(token);
      const dean_id = dean.user_id;
      if (dean_id) {
        await adminModal.pendingSession(dean_id).then((data) => {
          console.log("data----", data);
          if (data && data.length > 0) {
            return res.status(200).json({
              status: "OK",
              message: "List of pending sessions",
              Sessions: data,
            });
          }
          return res
            .status(400)
            .json({ status: "Failed", message: "No pending sessions !" });
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", message: "An error occurred" });
    }
  },
};
