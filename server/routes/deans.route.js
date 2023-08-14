const express = require("express");
const router = express.Router();

const { pendingSessions } = require("../controllers/sessionsController");

// Get list of pending sessions for dean
router.get("/pending-sessions", pendingSessions);

module.exports = router;
