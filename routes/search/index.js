exports.index = function(req, res, next) {
    if(req.param("q") || req.param("l") || req.param("g")) {
        req.models.guides.all().limit(8).run(function(error, guides) {
            res.render("search/index", {
                title: req.param("q"),
                guides: guides,
                user: req.session.user,
                js: req.js.renderTags("search"),
                css: req.css.renderTags("search")
            });
        });
    } else {
        res.redirect("/");
    }
}
