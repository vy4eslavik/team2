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
    VKontakteStrategy = require('passport-vkontakte').Strategy;
    env = require('node-env-file'),

    mongoose = require('mongoose'),



    config = require('./config'),
    staticFolder = config.staticFolder,

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

mongoose.connect('mongodb://localhost/pepo');

Seed = require('./models/seed.js');

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://"+process.env.HOSTNAME+"/login/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

  passport.use(new VKontakteStrategy(
    {
      clientID:     process.env.VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: process.env.VKONTAKTE_APP_SECRET,
      callbackURL:  "http://"+process.env.HOSTNAME+"/login/vkontakte/return"
    },
    function myVerifyCallbackFn(accessToken, refreshToken, profile, done) {

      // Now that we have user's `profile` as seen by VK, we can
      // use it to find corresponding database records on our side.
      // Here, we have a hypothetical `User` class which does what it says.
      User.findOrCreate({ vkontakteId: profile.id })
          .then(function (user) { done(null, user) })
          .catch(done);
    }
  ));

app.use(passport.initialize());
app.use(passport.session());

app.get('/ping/', function(req, res) {
    res.send('ok');
});

app.get('/', function(req, res) {
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

app.get('/login',
  function(req, res){
    res.send('<a href="/login/facebook">Log In with Facebook</a><a href="/login/vkontakte">Log In with vkontakte</a>');
  });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/login/vkontakte',
  passport.authenticate('vkontakte'),
  function (req, res) {
    // The request will be redirected to vk.com for authentication, so
    // this function will not be called.
  });

app.get('/login/vkontakte/return',
  passport.authenticate('vkontakte', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send(JSON.stringify(req.user));
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/home', function(req, res) {
    var seeds = [
        {
            id: '',
            msg: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
            datetime: '',
            parent: '', //Твит на который сделали ответ
            author_name: 'Drew Coleman',
            author_nick: 'drew_coleman',
            author_ava: 'http://xage.ru/media/posts/2013/3/25/fotografii-glaz-zhivotnyh-i-nasekomyh.jpg',
            img:''

        },
        {
            id: '',
            msg: 'There are many variations of passages of Lorem Ipsum available.',
            datetime: '',
            parent: '', //Твит на который сделали ответ
            author_name: 'Steve Nassar',
            author_nick: 'steve_nassar',
            author_ava: 'http://www.popmeh.ru/upload/iblock/1d3/1d36d9dd3c9b46f777d0507205cc74b6.jpg',
            img:''
        },
    ];
    render(req, res, {
        view: 'home',
        title: 'Home Page',
        meta: {
            description: 'Page description',
            og: {
                url: 'https://site.com',
                siteName: 'Site name'
            }
        },
        seeds:seeds
    })
});

app.get('/seed', function(req, res) {
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
});
app.get('/profile/my', function(req, res) {
    render(req, res, {
        view: 'editProfile',
        title: 'Edit profile',
        meta: {
            description: 'Редактиование сраницы пользователя'
        }
    })
});


app.get('/fakedata',function(req,res) {
    res.send('depreacated');
    /*

  var seed = new Seed({
    msg: 'test message',
    datetime: Math.floor(Date.now() / 1000)
  });
  seed.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('dees added');
    }
  });

  res.send('fakedata added');

    */
});

app.get('*', function(req, res) {
    res.status(404);
    return render(req, res, { view: '404' });
});

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
