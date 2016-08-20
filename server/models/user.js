var mongoose = require('mongoose');

var Seed = mongoose.model('User', {
    //id - автоматическое от MongoDB
    nick: {
        type:String,
        required: true,
        unique: true
    },
    userData: {
        firstName: String,
        lastName: String,
        description: String
    },
    avatar: String, // URL
    timeZone: Number, //
    follow: [], // на кого мы подписаны
    subscribers:[] // на кого мы подписались
});

module.exports = Seed;
