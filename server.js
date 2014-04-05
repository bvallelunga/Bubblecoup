/* Import NPM Modules */
var express    = require("express");
var device     = require("express-device");
var slashes    = require("connect-slashes");
var app        = express();
var piler      = require("piler");
var ejs        = require("ejs");
var RedisStore = require("connect-redis")(express);

/* IMPORTANT - Global Variables */
GLOBAL.$              = require("jquery");
GLOBAL.async          = require("async");
GLOBAL.config         = require("./config");
GLOBAL.lib            = require("./lib");
GLOBAL.clientJS       = piler.createJSManager({ urlRoot: "/js/" });
GLOBAL.clientCSS      = piler.createCSSManager({ urlRoot: "/css/" });

/* Express: Configuration */
app.configure(function() {
    //Assests
    clientJS.bind(app);
    clientCSS.bind(app);
    require("./public")(__dirname);

    //HTML Engine
    app.engine("html", ejs.renderFile);

    //Global Config
    app.set("views", __dirname + "/views");
    app.set("view engine", "html");
    app.set("view options", { layout: true });
    app.set("view cache", true);
    app.set("x-powered-by", false);

    //Direct Assests
    app.use("/favicons", express.static(__dirname + "/public/favicons"));
    app.use("/fonts", express.static(__dirname + "/public/fonts"));
    app.use("/img", express.static(__dirname + "/public/images"));

    //External Addons
    app.use(slashes(true));
    app.use(device.capture());

    //Logger & Cookie
    app.use(express.logger("dev"));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(config.cookies.session.secret));
    app.use(express.session({
        key: config.cookies.session.key,
        secret: config.cookies.session.secret,
        store: new RedisStore({
            client: lib.redis
        })
    }));
});

/* Development Only */
app.configure('development', function() {
    require('express-debug')(app, {
        theme: __dirname + config.development.debugger.theme,
        panels: config.development.debugger.panels
    });
});

/* Production Only */
app.configure('production', function() {
    /* Last Resort Error Handling */
    process.on('uncaughtException', function(exception) {
        console.error(exception);
        return false;
    });
});

/* Start Router */
app.use(app.router);
app.listen(80);
