module.exports = function(app, routes) {
    app.get('/', routes.home.index);
}
