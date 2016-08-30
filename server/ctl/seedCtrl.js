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

                seed.save(function (err) {
                    if (err) return next (err);
                });
                res.redirect('/');
            } else {
                res.redirect('/seed/add');
            }
        },

        view: function(req, res) {
            var seedId = req.query.id;
            console.log(seedId);
            Seed.getSeed(seedId, function(err,seed){
                if (err || !seed) {
                    console.log(err);
                    res.status(404);
                    return render(req, res, {view: '404'});
                }
                render(req, res, {
                    view: 'viewSeed',
                    title: 'Seed View Page',
                    seed: seed,
                    meta: {
                        description: 'Seed View Page',
                        og: {
                            url: 'https://site.com',
                            siteName: 'Site name'
                        }
                    }
                });
            });
        },

        getCountByAuthor: function (authorId, callback) {
            Seed.count({author: authorId}, callback);
        },

        getSeeds: function (user, opts, callback) {
            Seed.getPlain(user, opts, callback);
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
