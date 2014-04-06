/* Checks */
exports.restrictAccess = function(req, res, next) {
    if(req.session.user) {
        if(config.cookies.rememberme in req.cookies) {
            next()
        } else {
            req.models.users.get(req.session.user.id, function(error, user) {
                if(!error && user) {
                    user.set_recovery(req, res);
                } else {
                    res.redirect("/login?next=" + req.url);
                }
            });
        }
    } else {
        if(config.cookies.rememberme in req.cookies) {
            req.models.users.one({
                recovery: req.cookies[config.cookies.rememberme]
            }, function(error, user) {
                if(!error && user) {
                    user.set_recovery(req, res);
                    req.session.user = user;
                    req.session.save();
                    res.redirect(req.param("next") || config.general.default);
                } else {
                    res.redirect("/login?next=" + req.url);
                }
            });
        } else {
            res.redirect("/login?next=" + req.url);
        }
    }
};

exports.xhr = function(req, res, next) {
    if(req.xhr) {
        next();
    } else {
        res.redirect(config.general.default);
    }
}

/* Operations */
exports.login = function(req, res, next) {
    req.models.users.one({
        email: $.trim(req.param('email')),
        password: req.models.users.hash($.trim(req.param('password')))
    }, function(error, user) {
        if(!error && user) {
            req.session.user = user;
            req.session.save();

            res.json({
                success: true,
                next: req.param("next") || config.general.default
            });
        } else {
            res.json({
                success: false,
                error_message: "Invalid Credentials"
            });
        }
    });
}

exports.logout = function(req, res) {
    delete req.session.user;
    req.session.save();

    res.clearCookie(config.cookies.rememberme);
    res.redirect('/');
};

exports.register = function(req, res, next) {
    req.models.users.exists({
        email: req.param('email')
    }, function(error, exists) {
        if(error || exists) {
            res.json({
                sucess: false,
                error_message: "Email Already Exists"
            });
        } else {
            req.models.users.create({
                name: $.trim(req.param('name')),
                email: $.trim(req.param('email')),
                password: $.trim(req.param('password'))
            }, function(error, user) {
                if(!error) {
                    user.set_recovery(req, res);
                    req.session.user = user;
                    req.session.save();

                    res.json({
                        success: true,
                        next: req.param("next") || config.general.default
                    });

                } else {
                    res.json({
                        success: false,
                        error_message: "Failed to Register"
                    });
                }
            });
        }
    });
};
