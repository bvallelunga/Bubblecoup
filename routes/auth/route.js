module.exports = function(app, routes) {
    app.get('/login', routes.auth.index);
    app.get('/register', routes.auth.index);
    app.get('/logout', routes.auth.util.logout);

    app.post('/login', routes.auth.util.login);
    app.post('/register', routes.auth.util.register);

}
