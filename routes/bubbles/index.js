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
    async.parallel({
        bubble: function(callback) {
            req.models.bubbles.one({
                pub_id: req.param("bubble")
            }, callback);
        },
        shared: function(callback) {
            if(req.param("shared")) {
                req.models.bubbles.purchases.one({
                    pub_id: req.param("shared")
                }, callback);
            } else {
                callback();
            }
        }
    }, function(error, data) {
        if(!error && data) {
            if(!req.param("shared") || (data.shared && !data.shared)) {
                res.render("bubbles/purchase", {
                    title: data.bubble.name,
                    bubble: data.bubble,
                    shared: req.param("shared") || "",
                    user: req.session.user,
                    js: req.js.renderTags("bubbles"),
                    css: req.css.renderTags("bubbles")
                });
            } else {
                res.redirect("/");
            }
        } else {
            res.redirect("/");
        }
    });
}

exports.voucher = function(req, res, next) {
    req.models.bubbles.purchases.one({
        pub_id: req.param("voucher")
    }, { autoFetchLimit: 3 }, function(error, voucher) {
        if(!error && voucher && !voucher.used) {
            res.render("bubbles/voucher", {
                title: voucher.bubble.name + " Voucher",
                voucher: voucher,
                user: req.session.user,
                js: req.js.renderTags("bubbles"),
                css: req.css.renderTags("bubbles")
            });
        } else {
            res.redirect("/");
        }
    });
}
