var express = require("express");
var app = express();
var mongoose = require("mongoose");
var faker = require("faker");
var path = require("path");
var fakerModel = require("./models/customer");

mongoose.connect('mongodb://localhost:27017/fakedata', {
  useNewUrlParser: true
}).then(() => {
  console.log("connected to db");
}).catch((err) => console.log('connection error', err));

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.get('/', function(req, res) {
  fakerModel.find((err, data) => {
    if(err) {
      console.log(err);
    }
    else if(data) {
      res.render('index', {data: data});
    }
    else {
      res.render('index', {data: {}});
    }
  });
});

app.post('/', function(req, res) {
  for(var i = 0; i < 10; i++) {
    var fake = new fakerModel({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      phonenumber: faker.phone.phoneNumber(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipcode: faker.address.zipCode(),
      country: faker.address.country()
    });
    fake.save((err, data) => {
      if(err) {
        console.log(err);
      }
    });
  }
  res.redirect('/');
});

app.listen(4000);