var rand = require("generate-key");

module.exports = function (db, models) {
    return db.define("bubbles_purchases", {
        pub_id: String
    }, {
        timestamp: true,
        hooks: {
            beforeCreate: function() {
                this.pub_id = rand.generateKey(Math.floor(Math.random() * 15) + 15);
            }
        }
    });
};
