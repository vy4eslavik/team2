var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', {
    //id - автоматическое от MongoDB
    nick: {
        type:String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^[a-z0-9._-]+$/i.test(v);
          },
          message: 'noformat'
        }
    },
    facebook: Schema.Types.Mixed,
    vkontakte: Schema.Types.Mixed,
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

User.schema.path('nick').validate(function(value, respond) {
  User.findOne({nick: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'exists');


module.exports = User;
