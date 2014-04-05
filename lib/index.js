module.exports = {
    core: require("./core"),
    models: require("./models"),
    redis: require("./redis")(),
    init: function() {
        var _this = module.exports;

        _this.core.extensions();
    }
}
