/**
 * Created by lenur on 8/23/16.
 */

module.exports = function() {
    const render = require('../render').render;
    var User = require('../models/user.js');

    return {
        findById: function(req, res) {
            var userId = req.user._id;

            User.findById(userId, function (err, user) {
                if (err) console.log(err);

                render(req, res, {
                    view: 'editProfile',
                    title: 'Мои настройки',
                    meta: {
                        description: 'Редактирование профиля',
                        og: {
                            siteName: 'Pepo',
                            locale: 'ru_RU',
                            url: 'http://'+process.env.HOSTNAME
                        }
                    },
                    profileSettings: user,
                    userPath: 'http://'+process.env.HOSTNAME+'/profile/'+user.nick,
                    formSave: req.query.success,
                    isAuthenticated: req.isAuthenticated()
                })
            });
        },

        updateByID: function(req, res) {
            var body = req.body;

            var user = {
                // nick: body.nick,
                userData: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    description: body.aboutMe
                },
                timeZone: body.timeZone
            };

            if (req.file) {
                user.avatar = 'avatar/' + req.file.filename;
            }

            User.findByIdAndUpdate(body.userId, user, {new: true}, function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect('/profile/my?success=error');
                }

                res.redirect('/profile/my?success=done');
            });

        },

        findByIdPickName: function(req, res) {
            //TODO получать данные текущего пользователя. Сейчас получаем данные Алисы.
            var userId = req.user._id;

            User.findById(userId, function (err, user) {
                if (err) console.log(err);

                render(req, res, {
                    view: 'setupProfile',
                    title: 'Мои настройки',
                    meta: {
                        description: 'Создание профиля',
                        og: {
                            siteName: 'Pepo',
                            locale: 'ru_RU',
                            url: 'http://'+process.env.HTTP_HOST
                        }
                    },
                    profileSettings: user,
                    userPath: 'http://'+process.env.HTTP_HOST+'/profile/'+user.nick,
                    formSave: req.query.success,
                    isAuthenticated: req.isAuthenticated()
                })
            });
        },

        updateByIdPickName: function(req, res) {
            var body = req.body;

            var user = {
                nick: body.nick,
            };

            User.findByIdAndUpdate(body.userId, user, { runValidators: true }, function (err, user) {
                if (err) {
                    res.redirect('/profile/setup?success=error' + (err.errors.nick.message ? err.errors.nick.message : '') );
                }else{

                    user.nick = body.nick;
                    req.logIn(user, function(error) {
                        if (!error) {
                            // successfully serialized user to session
                            res.redirect('/profile/setup?success=done');
                        }
                    });
                }
            });

        },
    }
};
