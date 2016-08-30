var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    //id - автоматическое от MongoDB
    nick: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
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
    subscribers: [] // кто на нас подписан
});

schema.path('nick').validate(function (value, respond) {
    mongoose.models['User'].findOne({nick: value}, function (err, user) {
        if (err) throw err;
        if (user) return respond(false);
        respond(true);
    });
}, 'exists');

/*
 * Подписывает или отписывает пользователя.
 * Возвращает в callback функцию ошибку и новое состояние подписки.
 *
 * @param {id} currentUser Текущий пользователь
 * @param {id} subscribeUser Пользователь на которого подписываемся/отписываемся
 * @param {function} callback
 * */
schema.statics.subscribe = function (currentUser, subscribeUser, callback) {
    var userSchema = this;
    this.findOne({_id: currentUser, follow: subscribeUser}, function (err, user) {
        if (err) {
            return callback(err, null);
        }

        if (user) {
            // Отписываемся
            userSchema.findByIdAndUpdate(subscribeUser, {$pull: {subscribers: currentUser}}, function (err, user) {
                if (err) {
                    return callback(err, null);
                }
                userSchema.findByIdAndUpdate(currentUser, {$pull: {follow: subscribeUser}}, function (err, user) {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, false);
                });
            });
        } else {
            // Подписываемся
            userSchema.findByIdAndUpdate(subscribeUser, {$push: {subscribers: currentUser}}, function (err, user) {
                if (err) {
                    return callback(err, null);
                }
                userSchema.findByIdAndUpdate(currentUser, {$push: {follow: subscribeUser}}, function (err, user) {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, true);
                });
            });
        }
    });
};

/*
* Возвращает списки подписок
*
* @param
* */
schema.statics.subscription = function(currentUser, nick, subscription, callback) {
    var userSchema = this;
    userSchema.findOne({nick: nick}).exec().then(function(user) {
        console.log(user[subscription]);
        return userSchema.find({'_id': { $in: user[subscription]}}).exec().then(function (users) {
            return users.map(function (user) {
                user.subscribeState = (user.subscribers.indexOf(currentUser) >= 0);
                return user;
            });
        });
    }).then(function(profiles) {
        return callback(null, profiles);
    }).catch(function(err) {
        return callback(err, null);
    });
};

module.exports = mongoose.model('User', schema);
