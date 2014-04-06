exports.index = function(req, res, next) {
    async.parallel({
        guides: function(callback) {
            req.models.guides.all().limit(8).run(callback);
        },
        companies: function(callback) {
            req.models.companies.count(callback);
        },
        cities: function(callback) {
            req.db.driver.execQuery("SELECT count(DISTINCT(city)) FROM companies", function(error, cities) {
                callback(error, cities[0]['count(DISTINCT(city))']);
            });
        }
    }, function(errors, data) {
        res.render("home/index", {
            title: "",
            guides: data.guides,
            companies: data.companies,
            cities: data.cities,
            user: req.session.user,
            js: req.js.renderTags("home"),
            css: req.css.renderTags("home"),
            backdrop: req.backdrop()
        });
    });
}
