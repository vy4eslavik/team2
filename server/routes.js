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
    var userContent = multer.diskStorage({
        destination: config.staticFolder + '/usercontent/',
        filename: function (req, file, cb) {
            return cb(null, req.user.nick + '_file_' + Date.now() + '_' + file.originalname);
        }
    });
    //user initial setup
    router.get('/profile/setup', require('connect-ensure-login').ensureLoggedIn(), userController.findByIdPickName);
    router.post('/profile/setup', require('connect-ensure-login').ensureLoggedIn(), userController.updateByIdPickName);

    //seed
    router.post(
        '/seed/add',
        require('connect-ensure-login').ensureLoggedIn(),
        multer({ storage: userContent }).single('image'),
        seedController.add);
    router.get('/seed/add', require('connect-ensure-login').ensureLoggedIn(), seedController.modAddSeed);
    router.post('/seeds/notify', require('connect-ensure-login').ensureLoggedIn(), seedController.countNewSeeds);

    //view seed with replies
    router.get('/seed/view/:id', seedController.view);

    //user
    router.get('/profile/my', require('connect-ensure-login').ensureLoggedIn(), userController.editMyProfile);
    router.post('/profile/my', multer({ storage: avatarStorage }).single('newAvatar'), userController.updateMyProfile);
    router.get('/profile/:nick/:action', require('connect-ensure-login').ensureLoggedIn(), userController.profileAction);
    router.get('/profile/:nick', require('connect-ensure-login').ensureLoggedIn(), userController.viewProfile);
    router.get('/profiles', require('connect-ensure-login').ensureLoggedIn(), userController.viewProfiles);

    router.get('/login', function(req, res){
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

    router.get('/', require('connect-ensure-login').ensureLoggedIn(), function (req, res, next) {

        var isAjax = false;
        if( req.headers.isajax ) {
            isAjax = true;
        }
        var profile = req.user;
        seedController.getCountByAuthor(profile._id, function (err, count) {
            if (err) return next(err);
            profile.seedsCount = count;
            var opts = {};
            if (req.headers.fromtime) {
                opts.fromtime = new Date(req.headers.fromtime * 1000);
            }
            if (req.headers.newest) {
                opts.newest = new Date(req.headers.newest * 1000);
            }
            opts.author = profile.follow;
            opts.author.push(profile._id);
            seedController.getSeeds(profile, opts, function (err, seeds) {
                if (err) return next(err);
                if (!isAjax) {
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
                        currentUser: req.user,
                        isAuthenticated: req.isAuthenticated()
                    })
                } else {
                    res.send( JSON.stringify(seeds) );
                }
            });
        });
    });

    router.get('/search', require('connect-ensure-login').ensureLoggedIn(), function(req, res) {
          var profile = req.user;

          seedController.seedSearch(req.query.text, function(err, searchedSeeds) {
          render(req,res,{
          view: 'search',
          title: 'search',
          seeds: searchedSeeds,
          profile: profile,
          isAuthenticated: req.isAuthenticated()
    });
  });
});
    router.get('*', function(req, res) {
        res.status(404);
        return render(req, res, { view: '404' });
    });


    return router;
};
