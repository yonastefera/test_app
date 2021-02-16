const sqlite3 = require("sqlite3").verbose();
const offer = require("./offer");

exports.dbCreateTable = async () => {
  let db = await new sqlite3.Database("./sqlite3.db", err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });

  offer(db);
};
