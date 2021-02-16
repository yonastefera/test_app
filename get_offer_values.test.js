const getOfferValues = require("./src/backend/db/get_offer_values");

test("the result should be an array ", () => {
  expect(Array.isArray(getOfferValues("c51.json"))).toBe(true);
});
