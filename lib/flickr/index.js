var Flickr = require('flickr').Flickr;

module.exports = function() {
    return new Flickr(config.flickr.key, config.flickr.secret);
}
