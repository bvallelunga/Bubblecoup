exports.index = function(req, res, next) {
    res.render("home/index", {
        title: "Power of Being Social",
        title_first: false,
        user: req.session.user,
        js: req.js.renderTags("home"),
        css: req.css.renderTags("home")
    });
}
