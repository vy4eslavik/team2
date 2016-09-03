/**
 * Created by lenur on 8/22/16.
 */

var async = require('async');

module.exports = function(app) {

    const render = require('../render').render;
    var Seed = require('../models/seed.js');
    var User = require('../models/user.js');


    return {
        add: function(req, res, next) {
            if (req.body.text) {
                var msg = req.body.text;
                var seed = new Seed({
                    msg : msg,
                    datetime: Date.now(),
                    author: req.user._id,
                    parent: req.body.parent
                });

                if (req.file) {
                    seed.image = '/usercontent/' + req.file.filename;
                }

                seed.save(function (err) {
                    if (err) return next (err);
                });
                res.redirect('/');
            } else {
                res.redirect('/seed/add');
            }
        },

        view: function (req, res, next) {

            var seedId = req.params.id;

            async.waterfall([
                function (callback) {
                    Seed.getSeed(seedId, function (err, seed) {
                        if (err) return next(err);
                        seed.current = true;
                        callback(null, seed);
                    });
                },
                function (current, callback) {
                    var parents = [];

                    loadParents(current);

                    function loadParents(seed) {
                        if (seed.parent) {
                            Seed.getSeed(seed.parent, function (err, seed) {
                                if (err) return next(err);
                                parents.unshift(seed);
                                loadParents(seed);
                            })
                        } else {
                            callback(null, current, parents);
                        }
                    }
                },
                function (current, parents, callback) {
                    var childs = [];

                    loadChilds(current);

                    function loadChilds(seed) {
                        if (seed.child && seed.child.length) {
                            Seed.getSeed(seed.child[0], function (err, seed) {
                                if (err) return next(err);
                                childs.push(seed);
                                loadChilds(seed);
                            })
                        } else {
                            callback(null, current, parents, childs);
                        }
                    }
                }, function (current, parents, childs, callback) {
                    if (!current) {
                        res.status(404);
                        return render(req, res, {view: '404'});
                    }
                    render(req, res, {
                        view: 'viewSeed',
                        title: 'Seed View Page',
                        seeds: parents.concat(current, childs),
                        meta: {
                            description: 'Seed View Page',
                            og: {
                                siteName: 'Pepo',
                                locale: 'ru_RU',
                                url: 'http://' + process.env.HTTP_HOST
                            }
                        },
                        currentUser: req.user
                    });
                }
            ]);
        },

        getCountByAuthor: function (authorId, callback) {
            Seed.count({author: authorId}, callback);
        },

        getSeeds: function (user, opts, callback) {
            Seed.getPlain(user, opts, callback);
        },

        countNewSeeds: function(req, res, next){
            var profile = req.user;
            var opts = {};
            if (req.body.newest) {
                opts.newest = new Date(req.body.newest * 1000);
            }
            opts.author = profile.follow;

            Seed.getCountPlain(profile, opts, function (err, seeds) {
                if (err) return next(err);
                res.send(seeds.toString());
            });
        },

        modSeed: function(req, res) {
            render(req, res, {
                view: 'seed',
                title: 'Seed Page',
                meta: {
                    description: 'Page description',
                    og: {
                        url: 'https://site.com',
                        siteName: 'Site name'
                    }
                },
                currentUser: req.user || {}
            })
        },

        modAddSeed: function(req, res) {
            render(req, res, {
                view: 'addSeed',
                title: 'Add seed page',
                seedReplyTo: req.query.id,
                meta: {
                    description: 'Add seed page',
                    og: {
                        url: 'https://site.com',
                        siteName: 'Site name'
                    }
                },
                isAuthenticated: req.isAuthenticated()
              })
        },
        seedSearch : function(content, callback){
            console.log(content);
            Seed.getPlain({}, {search: content, fromtime: new Date()},  function(err, searchedSeeds) {
              if(err) return console.error(err);
              else {
                console.log(searchedSeeds);

                return callback(null, searchedSeeds);
              }
            });
        }
    };
};
