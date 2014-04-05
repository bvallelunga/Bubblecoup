var crypto = require('crypto');
var rand = require("generate-key");
var uuid = require('node-uuid');

module.exports = function (db, models) {
    var users = db.define("users", {
        pub_id: {
            type: "text"
        },
        name: {
            type: "text",
            required: true
        },
        email: {
            type: "text",
            required: true
        },
        password: {
            type: "text",
            required: true
        },
        recovery: String,
        stripe: String
    }, {
        timestamp: true,
        hooks: {
            beforeCreate: function() {
                this.pub_id = rand.generateKey(Math.floor(Math.random() * 15) + 15);
                this.password = this.hash(this.password);
            },
            beforeSave: function() {
                this.name = this.name.capitalize;
            }
        },
        methods: {
            hash: function(data) {
                return crypto.createHash('md5').update(data).digest("hex");
            },
            set_recovery: function(req, res) {
                this.save({
                    reset: null,
                    recovery: uuid.v4()
                });

                res.cookie(config.cookies.rememberme, this.recovery, {
                    maxAge: 1209600000,
                    httpOnly: true
                });
            },
            add_stripe: function(callback) {
                //TODO: Add User to Stripe
            }
        },
        validations: {
            pub_id: db.enforce.unique(),
            email: [
                db.enforce.patterns.email(),
                db.enforce.unique()
            ]
        }
    });

    users.hash = function(data) {
        return crypto.createHash('md5').update(data).digest("hex");
    }

    return users;
};
