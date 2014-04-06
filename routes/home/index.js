exports.index = function(req, res, next) {
    req.models.guides.all().limit(8).run(function(error, guides) {
        res.render("home/index", {
            title: "",
            guides: guides,
            user: req.session.user,
            js: req.js.renderTags("home"),
            css: req.css.renderTags("home"),
            backdrop: req.backdrop()
        });
    });
}
