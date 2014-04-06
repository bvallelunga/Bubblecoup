exports.purchase = function(req, res, next) {
    req.models.users.get(req.session.user.id, function(error, user) {
        if(!error && user) {
            var card = req.param("card");

            if(card) {
                lib.stripe.customers.createCard(user.stripe, {
                    card: {
                        name: card.name,
                        number: card.number,
                        exp_month: parseInt(card.expr.split("/")[0]),
                        exp_year: parseInt(card.expr.split("/")[1]),
                        cvc: card.cvc
                    }
                }, function(error, new_card) {
                    if(!error) {
                        var number = card.number.replace(/ /g, "");

                        user.card = {
                            id: new_card.id,
                            name: card.name,
                            number: number.substr(number.length - 4),
                            type: new_card.type.toLowerCase()
                        }

                        user.save(finish);
                        req.session.user = user;
                        req.session.save();
                    } else {
                        res.json({
                            success: false,
                            error_message: error.message
                        });
                    }
                });
            } else {
                finish();
            }

            function finish() {
                async.parallel({
                    bubble: function(callback) {
                        req.models.bubbles.one({
                            pub_id: req.param("bubble")
                        }, callback);
                    },
                    shared: function(callback) {
                        if(req.param("parent")) {
                            req.models.bubbles.purchases.one({
                                pub_id: req.param("parent")
                            }, callback);
                        } else {
                            callback();
                        }
                    }
                }, function(error, data) {
                    if(!error && data.bubble) {
                        req.models.bubbles.purchases.create({
                             owner_id: user.id,
                             bubble_id: data.bubble.id,
                             shared_id: (data.shared) ? data.shared.id : null

                        }, function(error, purchase) {
                            if(!error && purchase) {
                                res.json({
                                    success: true,
                                    next: "/voucher/" + purchase.pub_id + "/"
                                });
                            } else {
                                res.json({
                                    success: false,
                                    error_message: "Failed to Purchase Bubble"
                                });
                            }
                        });
                    } else {
                        res.json({
                            success: false,
                            error_message: "Failed to Purchase Bubble"
                        });
                    }
                });
            }
        } else {
            res.json({
                success: false,
                error_message: "Failed to Purchase Bubble"
            });
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
