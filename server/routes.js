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
    var Seed = require('./models/seed.js');
    var User = require('./models/user.js');

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

    router.get('/home', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {

        var profile = req.user;

        var seeds = [
            {
                id: '',
                msg: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
                datetime: new Date(),
                parent: '', //Твит на который сделали ответ
                author_name: 'Drew Coleman',
                author_nick: 'drew_coleman',
                author_ava: 'http://xage.ru/media/posts/2013/3/25/fotografii-glaz-zhivotnyh-i-nasekomyh.jpg',
                img: '/img/cat.jpg'
            },
            {
                id: '',
                msg: 'There are many variations of passages of Lorem Ipsum available.',
                datetime: new Date(),
                parent: '', //Твит на который сделали ответ
                author_name: 'Steve Nassar',
                author_nick: 'steve_nassar',
                author_ava: 'http://www.popmeh.ru/upload/iblock/1d3/1d36d9dd3c9b46f777d0507205cc74b6.jpg',
                img: '/img/cat.jpg'
            }
        ];

        Seed.find(function (err, seedsDb) {
            if (err) return next(err);
            async.each(seedsDb, function(seedDb, callback) {


                User.findById(seedDb.author, function (err, user) {
                    if (err) return next(err);
                    seeds.push({
                        id: seedDb._id,
                        msg: seedDb.msg,
                        datetime: seedDb.datetime,
                        parent: seedDb.parent[0], //Твит на который сделали ответ
                        author_name: user.userData.firstName,
                        author_nick: user.nick,
                        author_ava: user.avatar,
                        img: seedDb.image
                    });
                    callback();
                });
            }, function(err) {
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
                    seeds:seeds,
                    profile:profile,
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
