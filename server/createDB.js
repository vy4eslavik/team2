var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost/pepo');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    createSeeds
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user.js');
    require('./models/seed.js');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {



    var users = [
        {nick: 'alice', userData: {firstName: 'Alice'}, avatar:'avatar/alice.jpg'},
        {nick: 'cheshire', userData: {firstName: 'Cheshire cat'}, avatar:'avatar/cheshire.jpg'}
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}
function createSeeds(callback) {
    function addSeedChain(seedData, prevSeed, callback) {
        var seed = new mongoose.models.Seed(seedData);
        seed.save(function (err, seed) {
            if (prevSeed) {
                prevSeed.child.push(seed._id);
                prevSeed.save(function(err) {
                    if (err) return callback(err);
                    callback(null, seed);
                })
            } else {
                callback(null, seed);
            }
        });
    }

    async.waterfall([
        function(callback) {
            mongoose.models.User.findOne({nick: 'alice'}, callback);
        },
        function (alice, callback) {
            if (alice) {
                var aliceSeeds = [
                    {
                        author: alice._id,
                        msg: 'Мало кто находит выход, некоторые не видят его, даже если найдут, а многие даже не ищут.'
                    },
                    {
                        author: alice._id,
                        msg: 'Во всем есть своя мораль, нужно только уметь ее найти!'
                    },
                    {
                        author: alice._id,
                        msg: 'Знаешь, одна из самых серьезных потерь в битве - это потеря головы.'
                    },
                    {
                        author: alice._id,
                        msg: 'Подумать только, что из-за какой-то вещи можно так уменьшиться, что превратиться в ничто.'
                    },
                    {
                        author: alice._id,
                        msg: 'Если в мире всё бессмысленно, что мешает выдумать какой-нибудь смысл?'
                    },
                    {
                        author: alice._id,
                        msg: 'Никогда не думай, что ты иная, чем могла бы быть иначе, чем будучи иной в тех случаях, когда иначе нельзя не быть.'
                    }
                ];
                async.each(aliceSeeds, function(seedData, cb) {
                    var device = new mongoose.models.Seed(seedData);
                    device.save(cb);
                }, function () {
                    callback(null, alice);
                });
            }
        },
        function (alice, callback) {
            mongoose.models.User.findOne({nick: 'cheshire'}, function (err, cheshire) {
                if (err) return callback(err);
                callback(null, alice, cheshire);
            });
        },
        function (alice, cheshire, callback) {
            if (cheshire) {
                var seeds = [
                    {
                        author: alice._id,
                        msg: '@cheshire видала я котов без улыбок, но улыбку без кота…'
                    },
                    {
                        author: cheshire._id,
                        msg: 'Ничего не поделаешь, все мы здесь не в своем уме — и я, и ты, иначе бы ты сюда не попала.'
                    }
                ];
                async.each(seeds, function(seedData, callback) {
                    var device = new mongoose.models.Seed(seedData);
                    device.save(callback);
                }, function () {

                    callback(null, alice, cheshire);
                });
            }
        },
        function (alice, cheshire, callback) {
            addSeedChain({
                author: alice._id,
                msg: '@cheshire Куда мне отсюда идти?'
            }, null, function (err, seed) {
                if (err) return callback(err);
                callback(null, alice, cheshire, seed);
            });
        },
        function (alice, cheshire, prevSeed, callback) {
            addSeedChain({
                author: cheshire._id,
                msg: '@alice А куда ты хочешь попасть?',
                parent: [prevSeed._id]
            }, prevSeed, function (err, seed) {
                if (err) return callback(err);
                callback(null, alice, cheshire, seed);
            });
        },
        function (alice, cheshire, prevSeed, callback) {
            addSeedChain({
                author: alice._id,
                msg: '@cheshire А мне все равно, только бы попасть куда-нибудь.',
                parent: [prevSeed._id]
            }, prevSeed, function (err, seed) {
                if (err) return callback(err);
                callback(null, alice, cheshire, seed);
            });
        },
        function (alice, cheshire, prevSeed, callback) {
            addSeedChain({
                author: cheshire._id,
                msg: '@alice Тогда все равно куда идти. Куда-нибудь ты обязательно попадешь.',
                parent: [prevSeed._id]
            }, prevSeed, function (err, seed) {
                if (err) return callback(err);
                callback(null, alice, cheshire, seed);
            });
        }
    ], callback);


}
