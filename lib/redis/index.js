/* Import NPM Module */
var redis = require("redis");

module.exports = function() {
    return redis.createClient();
}
