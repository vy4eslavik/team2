var mongoose = require('mongoose');

var Seed = mongoose.model('Seed', {
    msg: String,
    datetime: String
});

module.exports = Seed;
