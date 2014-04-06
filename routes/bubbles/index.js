exports.index = function(req, res, next) {
    req.models.bubbles.one({
        pub_id: req.param("bubble")
    },  function(error, bubble) {
        if(!error && bubble) {
            res.render("bubbles/index", {
                title: bubble.name,
                bubble: bubble,
                user: req.session.user,
                js: req.js.renderTags("search"),
                css: req.css.renderTags("search")
            });
        } else {
            res.redirect("/");
        }
    });
}
