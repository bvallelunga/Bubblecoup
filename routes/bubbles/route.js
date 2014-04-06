module.exports = function(app, routes) {
    app.get('/bubbles/:bubble', routes.bubbles.index);
    app.get('/bubbles/:bubble/purchase', routes.auth.util.restrict, routes.bubbles.purchase);
}
