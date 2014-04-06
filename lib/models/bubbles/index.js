var rand = require("generate-key");

module.exports = function (db, models) {
    return db.define("bubbles", {
        pub_id: String,
        name: String,
        description: String,
        original: Number,
        discount: Number
    }, {
        timestamp: true,
        hooks: {
            beforeCreate: function() {
                this.pub_id = rand.generateKey(Math.floor(Math.random() * 15) + 15);
            }
        },
        validations: {
            pub_id: db.enforce.unique(),
            name: db.enforce.unique()
        }
    });
};
