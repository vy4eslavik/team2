/**
 * Created by lenur on 8/22/16.
 */

module.exports = function(conn, passport){
    const express = require('express')
        , router  = express.Router()
        , multer  = require('multer')
        , config = require('./config')
        ; render = require('./render').render
        ;

    var async = require('async');

    var seedController = require('./ctl/seedCtrl')(router);
    var userController = require('./ctl/userCtrl')(router);

    var avatarStorage = multer.diskStorage({
        destination: config.staticFolder+'/avatar/',
        filename: function (req, file, cb) {
            if(req.user){
                cb(null, req.user.nick+'.'+(file.mimetype.split('/')[1]));
                return;
            }
            cb(null, file.originalname);
        }
    });

    //seed
    router.get('/seed', seedController.modSeed);
    router.post('/seed/add', seedController.add);
    router.get('/seed/add', seedController.modAddSeed);

    //user
    router.get('/profile/my', require('connect-ensure-login').ensureLoggedIn(), userController.findById);
    router.post('/profile/my', multer({ storage: avatarStorage }).single('newAvatar'), userController.updateByID);

    //user initial setup
    router.get('/profile/setup', require('connect-ensure-login').ensureLoggedIn(), userController.findByIdPickName);
    router.post('/profile/setup', require('connect-ensure-login').ensureLoggedIn(), userController.updateByIdPickName);

    router.get('/', function(req, res) {
        render(req, res, {
            view: 'index',
            title: 'Main page',
            meta: {
                description: 'Page description',
                og: {
                    url: 'https://site.com',
                    siteName: 'Site name'
                }
            }
        })
    });

    router.get('/login',
        function(req, res){
          render(req, res, {
          view:'login',
          title: 'Authorization'
         });
        });

    router.get('/login/facebook',
        passport.authenticate('facebook'));

    router.get('/login/facebook/return',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/');
        });

    router.get('/login/vkontakte',
        passport.authenticate('vkontakte'),
        function (req, res) {
            // The request will be redirected to vk.com for authentication, so
            // this function will not be called.
        });

    router.get('/login/vkontakte/return',
        passport.authenticate('vkontakte', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    router.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    router.get('/home', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {

        var profile = req.user;
        seedController.getCountByAuthor(profile._id, function (err, count) {
            if (err) return next(err);
            profile.seedsCount = count;

            seedController.getSeeds(profile, function (err, seeds) {
                if (err) return next(err);
                render(req, res, {
                    view: 'home',
                    title: 'Home Page',
                    meta: {
                        description: 'Лента твитов',
                        og: {
                            url: 'https://pepo.local',
                            siteName: 'Pepo'
                        }
                    },
                    seeds: seeds,
                    profile: profile,
                    isAuthenticated: req.isAuthenticated()
                })
            });
        });
    });


    router.get('*', function(req, res) {
        res.status(404);
        return render(req, res, { view: '404' });
    });


    return router;
};
