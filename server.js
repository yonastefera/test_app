const express = require("express");
const app = express();

const path = require("path");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
var historyApiFallback = require("connect-history-api-fallback");
const instance = webpackMiddleware(compiler);
var getObjectsOffers = require("./src/backend/api.js");
const { dbCreateTable } = require("./src/backend/db/connection");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbCreateTable();
getObjectsOffers(app);
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(instance);
app.use(historyApiFallback());
app.use(instance);
app.use(require("webpack-hot-middleware")(compiler));

app.listen(process.env.PORT || 3000, () => console.log("Listening"));
