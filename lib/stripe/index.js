module.exports = require("stripe")(function() {
    if(config.general.production) {
        return config.stripe.production;
    } else {
        return config.stripe.development;
    }
}());
