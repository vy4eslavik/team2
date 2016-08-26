'use strict';
Object.assign || (Object.assign = require('object-assign'));

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    slashes = require('connect-slashes'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    env = require('node-env-file'),

    mongoose = require('mongoose'),

    config = require('./config'),
    staticFolder = config.staticFolder,

    User = require('./models/user.js'),

    Render = require('./render'),
    render = Render.render,
    dropCache = Render.dropCache,

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development';

env(__dirname + '/../.env');

app
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(favicon(path.join(staticFolder, 'favicon.ico')))
    .use(serveStatic(staticFolder))
    .use(morgan('combined'))
    .use(cookieParser())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressSession({
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret
    }))
    .use(express.static(__dirname + 'static'))
    .use(passport.initialize())
    .use(passport.session())
    .use(slashes());
    // TODO: csrf, gzip

mongoose.connect(config.mongoose.uri);
var db = mongoose.connection;

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://"+process.env.HTTP_HOST+"/login/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from Facebook (all the profile. stuff)
            if (!user) {
                user = new User({
                    nick: 'should.change.fb.'+profile.id,
                    userData: {
                      firstName: profile.displayName.split(' ')[0],
                      lastName: (profile.displayName.split(' ')[1] ? profile.displayName.split(' ')[1]+'' : ''),
                      description: ''
                    },
                    //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return cb(err, user);
                });
            } else {
                //found user. Return
                return cb(err, user);
            }
        });
  }));

  passport.use(new VKontakteStrategy(
    {
      clientID:     process.env.VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: process.env.VKONTAKTE_APP_SECRET,
      callbackURL:  "http://"+process.env.HTTP_HOST+"/login/vkontakte/return"
    },
    function myVerifyCallbackFn(accessToken, refreshToken, profile, cb) {

      // Now that we have user's `profile` as seen by VK, we can
      // use it to find corresponding database records on our side.
      // Here, we have a hypothetical `User` class which does what it says.
      User.findOne({
              'vkontakte.id': profile.id
          }, function(err, user) {
              if (err) {
                  return done(err);
              }
              //No user was found... so create a new user with values from Facebook (all the profile. stuff)
              if (!user) {
                console.log(profile);
                  user = new User({
                      nick: 'should.change.vk.'+profile.id,
                      userData: {
                        firstName: profile.displayName.split(' ')[0],
                        lastName: (profile.displayName.split(' ')[1] ? profile.displayName.split(' ')[1]+'' : ''),
                        description: ''
                      },
                      avatar: profile._json.photo ? profile._json.photo : '',
                      //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                      vkontakte: profile._json
                  });
                  user.save(function(err) {
                      if (err) console.log(err);
                      return cb(err, user);
                  });
              } else {
                  //found user. Return
                  return cb(err, user);
              }
          });
    }
  ));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    if (req.user && req.user.nick.indexOf('should.change.') > -1) {
        if ( req.url !== '/profile/setup/' ) {
            res.redirect('/profile/setup');
        } else {
            next();
        }
    } else {
        next();
    }
});

app.use(require('./routes.js')(db, passport));


if (isDev) {
    app.get('/error/', function() {
        throw new Error('Uncaught exception from /error');
    });

    app.use(require('errorhandler')());
}

isSocket && fs.existsSync(port) && fs.unlinkSync(port);

app.listen(port, function() {
    isSocket && fs.chmod(port, '0777');
    console.log('server is listening on', this.address().port);
});
