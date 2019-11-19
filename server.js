// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Original test on if server is working
//app.get("/", function(req, res) {
//  res.send("Hello World");
//});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//include api route file in server
require("./app/routing/apiRoutes.js")(app);
//include route file in server
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
