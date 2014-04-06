var rand = require("generate-key");

module.exports = function (db, models) {
    return db.define("bubbles_purchases", {
        pub_id: String
    }, {
        timestamp: true
    });
};
