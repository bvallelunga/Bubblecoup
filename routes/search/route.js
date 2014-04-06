module.exports = function(app, routes) {
    app.get('/search', routes.search.index);
}
