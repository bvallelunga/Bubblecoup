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
        parent: function(callback) {
            if(req.param("parent")) {
                req.models.bubbles.purchases.one({
                    pub_id: req.param("parent")
                }, callback);
            } else {
                callback();
            }
        }
    }, function(error, data) {
        if(!error && data) {
            if(!req.param("parent") || (data.parent && data.parent.owner_id != req.session.user.id && !data.parent.shared)) {
                if(data.parent) {
                    data.bubble.discount += 5;
                }

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
                js: req.js.renderTags("bubbles"),
                css: req.css.renderTags("bubbles")
            });
        } else {
            res.redirect("/");
        }
    });
}
