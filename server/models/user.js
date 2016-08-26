var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
    //id - автоматическое от MongoDB
    nick: {
        type:String,
        required: true,
        unique: true
    },
    facebook: Schema.Types.Mixed,
    vkontakte: Schema.Types.Mixed,
    userData: {
        firstName: String,
        lastName: String,
        description: String
    },
    facebook: {
      type: Object
    },
    vkontakte: {
      type: Object
    },
    avatar: String, // URL
    timeZone: Number, //
    follow: [], // на кого мы подписаны
    subscribers:[] // на кого мы подписались
});

module.exports = User;
