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
                js: req.js.renderTags("bubbles"),
                css: req.css.renderTags("bubbles")
            });
        } else {
            res.redirect("/");
        }
    });
}

exports.redeem = function(req, res, next) {
    async.parallel({
        user: function(callback) {
            req.models.users.one({
                pub_id: req.param("user")
            }, callback);
        },
        voucher: function(callback) {
            req.models.bubbles.purchases.one({
                pub_id: req.param("voucher")
            }, callback);
        },
        company: function(callback) {
            req.models.companies.exists({
                pub_id: req.param("company")
            }, callback);
        }
    }, function(error, data) {
        if(!error && data.user && data.company && data.voucher && !data.voucher.used) {
            data.voucher.save({
                used: true
            }, function(error) {
                if(!error) {
                    res.json({ success: true });
                } else {
                    res.json({
                        success: false,
                        error_message: "Failed to Redeem Voucher"
                    });
                }
            });
        } else {
            res.json({
                success: false,
                error_message: "Failed to Redeem Voucher"
            });
        }
    });
}
