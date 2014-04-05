/*
    NOTE: This file activates the routes provided by the
    routes module.
*/

module.exports = function(app) {
    /* Gets Routes */
    require("./routes")(function(routes) {
        $.each(routes, function(item, route) {
            if(route.route) {
                /* Activates Routes */
                route.route(app, routes);
            }
        });
    });
}
