const db = require("../configuration/dbConn");
module.exports = {
  bookingCompleteScheduler: async () => {
    try {
      const currentDate = new Date();
      const currentTime = new Date();
      const sessions = await db.any("SELECT id, start_time FROM sessions_tbl");

      for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        const [hour, minute] = session.start_time.split(":");

        const sessionStartTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          parseInt(hour),
          parseInt(minute)
        );

        if (sessionStartTime < currentTime) {
          await db.none(
            "UPDATE bookings_tbl SET is_completed = true WHERE session_id = $1",
            [session.id]
          );
        }
      }

      //   console.log("Completed sessions updated.");
    } catch (error) {
      console.error("Error updating completed sessions:", error);
    }
  },
};
