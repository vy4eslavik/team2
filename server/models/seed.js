var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId;

var schema =  new Schema({
    msg: String,
    tags: [],
    datetime: {
        type: Date,
        default: Date.now
    },
    parent: Schema.Types.ObjectId, // id Другого Seed
    child: [
        Schema.Types.ObjectId // id Другого Seed
    ],
    author: {
        type: Schema.Types.ObjectId, // id коллекции User
        required: true
    },
    image: String, // URL
    latlng: String,
    link: Schema.Types.ObjectId // id в кэше сниппетов ссылок
});

schema.statics.getPlain = function (user, opts, callback) {
    var seed = this;
    var fromtime = opts.fromtime || false;
    var author = opts.author || false;
    console.log(author);
    var agregators = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id", as: "user"
            }
        }, {
            $sort: {
                datetime: -1
            }
        },
        {
            $match: fromtime ? {
                datetime: {$lt: fromtime}
            } : {}
        },
        {
            $match: author ? {
                author: new ObjectId(author)
            } : {}
        },
        {
            $limit: 6
        }
    ];

    agregators.push();
    seed.aggregate(agregators, function(err, seeds) {
        if (err) return callback(err);
        var seedsPlain = seeds.map(function (seed) {
            return {
                id: seed._id,
                msg: seed.msg,
                datetime: seed.datetime,
                parent: seed.parent, //Твит на который сделали ответ
                author_name: seed.user[0].userData.firstName,
                author_nick: seed.user[0].nick,
                author_ava: seed.user[0].avatar,
                img: seed.image,
                followed: 1
            }
        });
        callback(null, seedsPlain);
    });
};


schema.statics.getSeed = function (seedId, callback) {
    var seed = this;
    var agregators = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id", as: "user"
            }
        },
        {
            $match: { _id: mongoose.Types.ObjectId(seedId) }
        }
    ];

    seed.aggregate(agregators, function(err, seeds) {
        if (err) return callback(err);
        var seed = seeds[0] || null;
        var result = {
                id: seed._id,
                msg: seed.msg,
                datetime: seed.datetime,
                parent: seed.parent, //Твит на который сделали ответ
                child: seed.child,
                author_name: seed.user[0].userData.firstName,
                author_nick: seed.user[0].nick,
                author_ava: seed.user[0].avatar,
                img: seed.image,
                followed: 1
            }
        callback(null, result);
    });
};


schema.post('save', function(doc) {
    if (doc.parent) {
        this.model('Seed').findByIdAndUpdate(doc.parent, {$push: {child: doc._id }}, function (err, doc){
            if (err) console.log(err);
        });
    }
});

schema.pre('save', function(next) {
    if (this.msg) {
        var tags = this.msg.match(/#.+?(\s|$)/g);
        if (tags) {
            this.tags = tags.map(function(tag){
                return tag.trim().substr(1);
            });
        }
    }
    next();
});

module.exports = mongoose.model('Seed', schema);
