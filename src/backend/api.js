const request = require("request");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

module.exports = getObjectsOffers = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get("/api/get/objects", (req, res) => {
    let db = new sqlite3.Database("./sqlite3.db", err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Connected to the in-memory SQlite database.");
    });

    db.all(`SELECT * FROM offers`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.send({ objects: rows });
    });
  });
};
