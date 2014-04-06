exports.index = function(req, res, next) {
    if(req.param("q") || req.param("l") || req.param("g")) {
        async.parallel({
            guides: function(callback) {
                req.models.guides.all().limit(8).run(callback);
            },
            bubbles: function(callback) {
                bubbles = [];
                bubbles_ids = [];

                async.parallel([
                    //Search by guides
                    function(next) {
                        if(req.param("g")) {
                            req.models.guides.one({
                                slug: req.param("g")
                            }, function(error, guide) {
                                if(!error && guide) {
                                    async.each(guide.bubbles, function(bubble, move) {
                                         if(bubbles_ids.indexOf(bubble.id) == -1) {
                                             bubbles.push(bubble);
                                             bubbles_ids.push(bubble.id);
                                         }

                                         move();
                                    }, next);
                                } else {
                                    next();
                                }
                            });
                        } else {
                            next();
                        }
                    },

                    //Search by location
                    function(next) {
                        if(req.param("l")) {
                            var location = req.param("l") .split(",");
                            req.models.bubbles.one({
                                city: $.trim(location[0]).toLowerCase().replace(/ /g, "_")
                            }, function(error, company) {
                                if(!error && company) {
                                    async.each(company.bubbles, function(bubble, move) {
                                         if(bubbles_ids.indexOf(bubble.id) == -1) {
                                             bubbles.push(bubble);
                                             bubbles_ids.push(bubble.id);
                                         }

                                         move();
                                    }, next);
                                } else {
                                    next();
                                }
                            });
                        } else {
                            next();
                        }
                    },

                    //Search by query
                    function(next) {
                        if(req.param("q")) {
                            req.models.bubbles.find({
                                name: req.db.tools.like("%" + req.param("q").toLowerCase() + "%")
                            }, function(error, search_bubbles) {
                                if(!error && search_bubbles) {
                                    async.each(search_bubbles, function(bubble, move) {
                                         if(bubbles_ids.indexOf(bubble.id) == -1) {
                                             bubbles.push(bubble);
                                             bubbles_ids.push(bubble.id);
                                         }

                                         move();
                                    }, next);
                                } else {
                                    next();
                                }
                            });
                        } else {
                            next();
                        }
                    }
                ], function(errors) {
                    callback(errors, bubbles);
                });
            }
        }, function(error, data) {
           res.render("search/index", {
                title: req.param("q"),
                guides: data.guides || [],
                bubbles: data.bubbles,
                location: req.param("l") || "",
                searched_guide: req.param("g"),
                user: req.session.user,
                js: req.js.renderTags("search"),
                css: req.css.renderTags("search")
            });
        });
    } else {
        res.redirect("/");
    }
}
