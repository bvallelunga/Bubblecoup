exports.index = function(req, res, next) {
    res.render("auth/index", {
        title: "Authenticate",
        js: req.js.renderTags("auth"),
        css: req.css.renderTags("auth")
    });
}
