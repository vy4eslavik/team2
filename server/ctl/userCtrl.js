/**
 * Created by lenur on 8/23/16.
 */

module.exports = function() {
    const render = require('../render').render;
    var User = require('../models/user.js');
    var Seed = require('../models/seed.js');

    return {
        editMyProfile: function(req, res) {
            var userId = req.user._id;

            User.findById(userId, function (err, user) {

                if (err || !user) {
                    console.log(err);
                    res.status(404);
                    return render(req, res, { view: '404' });
                }

                render(req, res, {
                    view: 'editProfile',
                    title: 'Мои настройки',
                    meta: {
                        description: 'Редактирование профиля',
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
                });
            });
        },

        updateMyProfile: function(req, res) {
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
                if (err || !user) {
                    console.log(err);
                    res.redirect('/profile/my?success=error');
                }

                res.redirect('/profile/my?success=done');
            });

        },

        viewProfile: function (req, res, next) {

            User.findOne({ nick: req.params.nick}, function (err, user){
                if(err || !user)  {
                    console.log(err);
                    res.status(404);
                    return render(req, res, { view: '404' });
                }

                Seed.getPlain(user, function(err, seeds){
                    if (err) console.log(err);

                    render(req, res, {
                        view: 'viewProfile',
                        title: user.nick,
                        meta: {
                            description: user.userData.description,
                            og: {
                                siteName: 'Pepo',
                                locale: 'ru_RU',
                                url: 'http://'+process.env.HTTP_HOST
                            }
                        },
                        user: user,
                        seeds: seeds
                    });

                });
            });
        },

        findByIdPickName: function(req, res) {
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
