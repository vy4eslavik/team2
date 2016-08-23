/**
 * Created by lenur on 8/22/16.
 */

module.exports = function(app) {

    const render = require('../render').render;
    var Seed = require('../models/seed.js');

    return {
        add: function(req, res) {
            var msg = req.body.name + ':' + req.body.text;
            var seed = new Seed({
                msg : msg,
                datetime: Math.floor(Date.now() / 1000),
                parent: null,
                child: null,
                author: '57babc7516a4faab2093b42b',
                image: null,
                latlng: null,
                link: null
            });

            seed.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('add');
                }
            });
            res.redirect('/');
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