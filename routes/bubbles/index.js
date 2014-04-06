exports.index = function(req, res, next) {
    req.models.bubbles.one({
        pub_id: req.param("bubble")
    },  function(error, bubble) {
        if(!error && bubble) {
            res.render("bubbles/index", {
                title: bubble.name,
                bubble: bubble,
                user: req.session.user,
                js: req.js.renderTags("bubbles"),
                css: req.css.renderTags("bubbles")
            });
        } else {
            res.redirect("/");
        }
    });
}

exports.purchase = function(req, res, next) {
    req.models.bubbles.one({
        pub_id: req.param("bubble")
    },  function(error, bubble) {
        if(!error && bubble) {
            res.render("bubbles/purchase", {
                title: bubble.name,
                bubble: bubble,
                user: req.session.user,
                js: req.js.renderTags("bubbles"),
                css: req.css.renderTags("bubbles")
            });
        } else {
            res.redirect("/");
        }
    });
}
