const mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
});

module.exports = mongoose.model('fakecollections', customerSchema);