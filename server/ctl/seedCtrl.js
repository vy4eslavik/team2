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
                    author: req.user._id
                });

                seed.save(function (err) {
                    if (err) return next (err);
                });
                res.redirect('/');
            } else {
                res.redirect('/seed/add');
            }
        },

        getCountByAuthor: function (authorId, callback) {
            Seed.count({author: authorId}, callback);
        },

        getSeeds: function (user, callback) {
            Seed.getPlain(user, callback);
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
                meta: {
                    description: 'Add seed page',
                    og: {
                        url: 'https://site.com',
                        siteName: 'Site name'
                    }
                }
            })
        }
    }

};
