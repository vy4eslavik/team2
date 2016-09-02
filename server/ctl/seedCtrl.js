/**
 * Created by lenur on 8/22/16.
 */

module.exports = function(app) {

    const render = require('../render').render;
    var Seed = require('../models/seed.js');

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

        view: function(req, res) {

            var seedId = req.params.id;
            console.log(seedId);
            var seeds = [];

            getSeed(seedId, seeds);

            function getSeed(seedId,seeds){
                Seed.getSeed(seedId, function(err, seed){
                    if (err || !seed) {
                                console.log(err);
                                res.status(404);
                                return render(req, res, {view: '404'});
                            }
                    if(seed) seeds.push(seed);


                    var child = seed.child || [];
                    if(child.length){
                        getSeed(child[0], seeds);
                    } else{
                        render(req, res, {
                                    view: 'viewSeed',
                                    title: 'Seed View Page',
                                    seeds: seeds,
                                    meta: {
                                        description: 'Seed View Page',
                                        og: {
                                            siteName: 'Pepo',
                                            locale: 'ru_RU',
                                            url: 'http://'+process.env.HTTP_HOST
                                        }
                                    }
                                });
                    }
                }, seeds);
            }
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
                }
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
            });
        }
    };
};
