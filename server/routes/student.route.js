const express = require("express");
const router = express.Router();
const {
  freeSesssions,
  bookSession,
} = require("../controllers/sessionsController");

// Get list of available sessions
router.get("/free-sessions", freeSesssions);
// Book a session
router.post("/book-session/:sessionID", bookSession);

module.exports = router;
