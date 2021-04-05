var express = require("express");
var app = express();
var mongoose = require("mongoose");
var faker = require("faker");
var path = require("path");
const bodyParser=require('body-parser');
var fakerModel = require("./models/user");

mongoose
  .connect("mongodb://localhost:27017/hubroot", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => console.log("connection error", error));
  app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.get("/", (req, res) => {
  fakerModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else if (data) {
        console.log(data);
      res.render("home", { data: data });
    } else {
      res.render("home", { data: {} });
    }
  });
});

app.post("/", (req, res) => {
  for (var i = 0; i < 10; i++) {
    var fake = new fakerModel({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: faker.phone.phoneNumber(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
    });
    fake
      .save()
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: "not found body empty",
          });
        } else if (result) {
          return res.status(200).json({
            message: "inserted successfuly",
          });
        } else {
          return res.status(200).json({
            message: "Failed ",
          });
        }
      })
      .catch();
  }
});

var port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server running at port " + port));
