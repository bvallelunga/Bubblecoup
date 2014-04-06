module.exports = function(app, routes) {
    app.get('/bubbles/:bubble', routes.bubbles.index);
    app.get('/bubbles/:bubble/purchase', routes.auth.util.restrict, routes.bubbles.purchase);
    app.get('/bubbles/:bubble/purchase/:parent', routes.auth.util.restrict, routes.bubbles.purchase);

    app.get('/voucher/:voucher', routes.bubbles.voucher);
    app.get('/redeem/:voucher/:company/:user', routes.auth.util.xhr, routes.bubbles.redeem);

    app.post('/bubbles/:bubble/purchase', routes.auth.util.restrict, routes.bubbles.util.purchase);
    app.post('/bubbles/:bubble/purchase/:parent', routes.auth.util.restrict, routes.bubbles.util.purchase);
}
