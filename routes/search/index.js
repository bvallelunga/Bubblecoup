exports.index = function(req, res, next) {
    res.render("search/index", {
        title: "",
        user: req.session.user,
        js: req.js.renderTags("home"),
        css: req.css.renderTags("home"),
        backdrop: req.backdrop()
    });
}
