module.exports = function(app, routes) {
    app.get('/bubbles/:bubble', routes.bubbles.index);
}
