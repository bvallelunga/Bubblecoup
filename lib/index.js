module.exports = {
    core: require("./core"),
    models: require("./models"),
    redis: require("./redis")(),
    init: function(ejs) {
        var _this = module.exports;

        _this.core.extensions();
        _this.core.filters(ejs);
    }
}
