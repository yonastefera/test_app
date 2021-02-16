const fs = require("fs");

module.exports = function getOfferValues(filename) {
  let rawdata = fs.readFileSync(filename);
  let jsondata = JSON.parse(rawdata);
  return jsondata.offers.map(item => {
    return Object.values(item);
  });
};
