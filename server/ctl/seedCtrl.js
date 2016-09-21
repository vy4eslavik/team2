/**
 * Created by lenur on 8/22/16.
 */

var async = require('async');

module.exports = function (app) {

    const render = require('../render').render;
<<<<<<< 8fef81d5eac488e25b72e42e815bc8305bdfa5a6
    var Seed = require('../models/seed.js');
    var User = require('../models/user.js');

    // Escape HTML
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    function replaceTag(tag) {
        return tagsToReplace[tag] || tag;
    }
    function escape(str) {
        return str.replace(/[&<>]/g, replaceTag);
    }
    //----------------------

    return {
        add: function(req, res, next) {
            if (req.body.text) {
                var msg = escape(req.body.text);
                var seed = new Seed({
                    msg: msg,
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

=======
    var Seed = require('../models/seed.js'),
        User = require('../models/user.js'),
        path = require('path'),
        bundleName = 'index',
        pathToBundle = path.resolve('desktop.bundles', bundleName),
        BEMTREE = require(path.join(pathToBundle, bundleName + '.bemtree.js')).BEMTREE,
        BEMHTML = require(path.join(pathToBundle, bundleName + '.bemhtml.js')).BEMHTML;

    function remove(req, res) {
        Seed.findByIdAndRemove(req.params.id, function (err, seed) {
            if (err) return res.send(err);

            Seed.update({parent: seed._id}, {$unset: { parent: "" } }, {multi: true}, function (err, seeds){
               if(err) console.log(err);
            });
            Seed.update({child: seed._id}, { $pull: { child : seed._id } }, {multi: true}, function (err, seeds){
                if(err) console.log(err);
            });
            var html = BEMHTML.apply(
                BEMTREE.apply(
                    {
                        block: 'button',
                        mods: {theme: 'islands', size: 'm'},
                        mix: {block: 'seed-list-item', elem: 'restore'},
                        text: 'Восстановить'
                    }
                ));
            return res.send({restoreButton: html, seed: seed});
        });
    }

    return {
>>>>>>> Удаление сида
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
                        currentUser: req.user,
                        isAuthenticated: req.isAuthenticated()
                    });
                }
            ]);
        },
        modAddSeed: function (req, res) {
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
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            })
        },
        seedAction: function (req, res, next) {
            if (req.params.action === 'remove') return remove(req, res);
        },
        add: function (req, res, next) {
            if (req.body.text || req.body.seed) {
                var seed = new Seed(
                    req.body.seed ||
                    {
                        msg: req.body.text,
                        datetime: Date.now(),
                        author: req.user._id,
                        parent: req.body.parent
                    });

                if (req.file) {
                    seed.image = '/usercontent/' + req.file.filename;
                }

                seed.save(function (err) {
                    if (err) return req.body.seed ? res.send(false) : next(err);
                });
                return req.body.seed ? res.send(true) : res.redirect('/');
            } else {
                res.redirect('/seed/add');
            }
        },

        getCountByAuthor: function (authorId, callback) {
            Seed.count({author: authorId}, callback);
        },

        getSeeds: function (user, opts, callback) {
            Seed.getPlain(user, opts, callback);
        },

        countNewSeeds: function (req, res, next) {
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

        modSeed: function (req, res) {
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
        seedSearch: function (content, callback) {
            if (content[0] == '#') {
                content = content.substr(1);
                Seed.getPlain({}, {tag: content, fromtime: new Date()}, function (err, searchedTags) {
                    if (err) return console.error(err);
                    else {
                        return callback(null, searchedTags);
                    }
                });
            }

            else if (content[0] == '@') {
                content = content.substr(1);
                User.find({nick: new RegExp(content)}, function (err, searchedNicks) {
                    if (err) return console.error(err);
                    else {
                        return callback(null, searchedNicks);
                    }
                });
            }

            else {
                Seed.getPlain({}, {search: content, fromtime: new Date()}, function (err, searchedSeeds) {
                    if (err) return console.error(err);
                    else {
                        return callback(null, searchedSeeds);
                    }
                });
            }
        }
    };
};
