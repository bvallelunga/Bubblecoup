module.exports = function(app, routes) {
    app.get('/login', routes.auth.login);
    app.post('/login', routes.auth.util.login);
    app.post('/logout', routes.auth.util.logout);

    app.get('/register', routes.auth.login);
    app.post('/register', routes.auth.util.register);
}
