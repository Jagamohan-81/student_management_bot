const db = require("../configuration/dbConn");

module.exports = {
  studentRegisterModel: async (data) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO students_tbl(name,university_id,password) VALUES ($1,$2,$3) RETURNING id",
        [data.name, data.university_id, data.password]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },

  studentLogIn: async (id) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM students_tbl WHERE university_id = $1", [id])
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  insertToken: async (user) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO tokens_tbl(user_id,token) VALUES ($1,$2) RETURNING id",
        [user.id, user.token]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  findUserExistance: async (university_id) => {
    return new Promise((resolve, reject) => {
      db.any("select * from students_tbl where university_id =($1)", [
        university_id,
      ])
        .then((data) => {
          if (data.length > 0) {
            resolve({ success: true });
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  deanRegisterModel: async (data) => {
    return new Promise((resolve, reject) => {
      db.one(
        "INSERT INTO deans_tbl(name,university_id,password) VALUES ($1,$2,$3) RETURNING id",
        [data.name, data.university_id, data.password]
      )
        .then(function (data) {
          resolve(data);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  deanLogIn: async (id) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM deans_tbl WHERE university_id = $1", [id])
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
  findDeanExistance: async (university_id) => {
    return new Promise((resolve, reject) => {
      db.any("select * from deans_tbl where university_id =($1)", [
        university_id,
      ])
        .then((data) => {
          if (data.length > 0) {
            resolve({ success: true });
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getUserIDFromToken: async (token) => {
    return new Promise((resolve, reject) => {
      db.oneOrNone("SELECT * FROM tokens_tbl WHERE token = $1", [token])
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },

  getFreeSessions: async (id) => {
    return new Promise((resolve, reject) => {
      db.any(
        "SELECT s.*, d.name as dean_name " +
          "FROM sessions_tbl s " +
          "JOIN deans_tbl d ON s.dean_id = d.id " +
          "WHERE s.day IN ('Thursday', 'Friday') " +
          "AND s.start_time = '10:00' " +
          "AND s.id NOT IN (SELECT session_id FROM bookings_tbl WHERE student_id = $1)",
        [id]
      )
        .then(function (sessions) {
          resolve(sessions);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },

  bookSession: async ({ studentID, sessionID }) => {
    return new Promise((resolve, reject) => {
      // Check if the booking already exists
      db.oneOrNone(
        "SELECT * FROM bookings_tbl WHERE student_id = $1 AND session_id = $2",
        [studentID, sessionID]
      )
        .then(function (existingBooking) {
          if (existingBooking) {
            resolve(null);
          } else {
            db.one(
              "INSERT INTO bookings_tbl (student_id, session_id) VALUES ($1, $2) RETURNING id",
              [studentID, sessionID]
            )
              .then(function (newBooking) {
                resolve({
                  status: "OK",
                  message: "Booking successful",
                  bookingID: newBooking.id,
                });
              })
              .catch(function (insertErr) {
                console.log(insertErr);
                reject(insertErr);
              });
          }
        })
        .catch(function (queryErr) {
          console.log(queryErr);
          reject(queryErr);
        });
    });
  },

  pendingSession: async (dean_id) => {
    return new Promise((resolve, reject) => {
      db.any(
        "SELECT s.id, s.day, s.start_time, s.duration, u.name AS student_name FROM sessions_tbl s JOIN bookings_tbl b ON s.id = b.session_id JOIN students_tbl u ON b.student_id = u.id WHERE b.is_completed = $1 AND s.dean_id = $2",
        [false, dean_id]
      )
        .then(function (user) {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    });
  },
};
