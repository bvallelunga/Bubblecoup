exports.login = function(req, res, next) {
    res.render("auth/login", {
        title: "Sign In",
        js: req.js.renderTags("auth"),
        css: req.css.renderTags("auth"),
        backdrop: req.backdrop()
    });
}

exports.register = function(req, res, next) {
    res.render("auth/register", {
        title: "Sign Up",
        js: req.js.renderTags("auth"),
        css: req.css.renderTags("auth"),
        backdrop: req.backdrop()
    });
}
