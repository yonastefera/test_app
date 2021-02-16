const getOfferValues = require("./get_offer_values");

module.exports = async function(db) {
  let resObject = getOfferValues("c51.json");
  await db.run("DROP TABLE offers", function(err) {
    if (err) {
      return console.log(err.message);
    } else {
      console.log("drop table");
    }
  });

  await db.run(
    "CREATE TABLE IF NOT EXISTS offers([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, [offer_id] NVARCHAR(120), [name] NVARCHAR(120), [image_url] NVARCHAR(120), [cash_back] NVARCHAR(120))",
    function(err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("Create Table");
      resObject.map(item => {
        db.run(
          `INSERT INTO offers (offer_id, name, image_url, cash_back) VALUES (?,?,?,?)`,
          item,
          function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          }
        );
      });

      db.close(err => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Close the database connection.");
      });
    }
  );
};
