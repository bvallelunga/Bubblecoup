module.exports = function(app, routes) {
    app.get('/bubbles/:bubble', routes.bubbles.index);
    app.get('/bubbles/:bubble/purchase', routes.auth.util.restrict, routes.bubbles.purchase);
    app.get('/bubbles/:bubble/purchase/:shared', routes.auth.util.restrict, routes.bubbles.purchase);

    app.post('/bubbles/:bubble/purchase', routes.auth.util.restrict, routes.bubbles.util.purchase);
    app.post('/bubbles/:bubble/purchase/:shared', routes.auth.util.restrict, routes.bubbles.util.purchase);
}
