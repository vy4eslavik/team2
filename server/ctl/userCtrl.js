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
                console.log(user);
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
                user.avatar = '/avatar/' + req.file.filename;
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

                Seed.count({author: user.id}, function (err, count) {
                    if(err) { console.log(err); }

                    user.seedsCount = count;
                    var opts = {};
                    opts.author = user.id;
                    Seed.getPlain(user, opts, function(err, seeds){
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
                            seeds: seeds,
                            currentUserId: req.user._id,
                            isAuthenticated: req.isAuthenticated()
                        });
                    });
                });
            });
        },
        viewProfiles: function (req, res) {
            var user_id = req.user._id || ''
            User.getProfiles(req.user._id,function (err, users){
                if (err || !users) {
                    console.log(err);
                    res.status(404);
                    return render(req, res, {view: '404'});
                }
                render(req, res, {
                    view: 'viewProfiles',
                    title: 'Profiles',
                    meta: {
                        description: 'Profiles',
                        og: {
                            siteName: 'Pepo',
                            locale: 'ru_RU',
                            url: 'http://'+process.env.HTTP_HOST
                        }
                    },
                    users: users,
                    currentUserId: req.user._id,
                    isAuthenticated: req.isAuthenticated()
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
                nick: body.nick
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

        profileAction: function(req, res) {
            if(req.params.action === 'subscribe') {
                if(!req.query.userId) {
                    return res.send('parameter userId required!');
                }
                User.subscribe(req.user._id, req.query.userId, function (err, subscribeState) {
                    User.findOne({ _id: req.user._id}, function (err, user){
                        req.logIn(user, function(error) {
                            if(!error){
                                res.send(err || subscribeState);
                            }
                        });
                    });

                });
                return;
            }

            User.subscription(req.user._id, req.params.nick, req.params.action, function (err, profiles) {
                if(err) {
                    res.status(404);
                    return render(req, res, { view: '404' });
                }

                render(req, res, {
                    view: 'viewSubscription',
                    title: req.params.nick + ' '+req.params.action,
                    meta: {
                        description: req.params.nick + ' '+req.params.action,
                        og: {
                            siteName: 'Pepo',
                            locale: 'ru_RU',
                            url: 'http://'+process.env.HTTP_HOST
                        }
                    },
                    profiles: profiles,
                    currentUserId: req.user._id,
                    isAuthenticated: req.isAuthenticated()
                });
            });
        }
    };
};
