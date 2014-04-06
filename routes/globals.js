var fs = require("fs");
var backdrop_themes = {};

module.exports = function(req, res, next) {
    //Set Server Root For Non Express Calls
    req.session.server = req.protocol + "://" + req.host;
    req.verified = (req.host.split(".").slice(-2).join(".") == config.general.security);

    if(!config.general.production || !config.random) {
        config.random = Math.floor((Math.random()*1000000)+1);
    }

    //Header Config
    res.header("Server", config.general.company);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.host);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

    //Device Info
    var device = req.device.type.toLowerCase();
    req.mobile = ["phone", "tablet"].indexOf(device) != -1;
    req.robot = (device == "bot");
    req.tv = (device == "tv");
    req.location = lib.geoip(req.ip) || {
        city: null,
        region: null,
        country: null,
        ll: [null, null]
    };

    //Session Save
    req.session.save();

    //Locals
    res.locals.csrf = (req.csrfToken) ? req.csrfToken() : "";
    res.locals.production = config.general.production;
    res.locals.host = req.session.server;
    res.locals.title = "";
    res.locals.site_title = config.general.company;
    res.locals.site_delimeter = config.general.delimeter.web;
    res.locals.description = config.general.description.join("");
    res.locals.company = config.general.company;
    res.locals.logo = config.general.logo;
    res.locals.config = {};
    res.locals.icons = config.icons;
    res.locals.user = req.session.user;
    res.locals.title_first = true;
    res.locals.location = req.location;
    res.locals.random = "?rand=" + config.random;
    res.locals.type = "website";
    res.locals.search = req.param("q") || "";
    res.locals.logos = {
        "logo":  res.locals.host + "/img/logo.png",
        "graph": res.locals.host + "/favicon/196.png",
        "1000":  res.locals.host + "/favicon/1000.png",
        "500":   res.locals.host + "/favicon/500.png",
        "196":   res.locals.host + "/favicon/196.png",
        "160":   res.locals.host + "/favicon/160.png",
        "114":   res.locals.host + "/favicon/114.png",
        "72":    res.locals.host + "/favicon/72.png",
        "57":    res.locals.host + "/favicon/57.png",
        "32":    res.locals.host + "/favicon/32.png"
    };

    //Backdrop
    if(!req.xhr) {
        req.backdrop = function(theme) {
            if(!theme) {
                if(req.location.city) {
                    theme = req.location.city.toLowerCase().replace(/ /g, '_');
                } else {
                    theme = config.general.backdrop;
                }
            }

            if($.isEmptyObject(backdrop_themes)) {
                var themes = __dirname + "/../public/images/backgrounds/";

                $.each(fs.readdirSync(themes), function(index, theme) {
                    var theme_path = themes + "/" + theme;
                    var stats = fs.lstatSync(theme_path);

                    if(stats.isDirectory() || stats.isSymbolicLink()) {
                        var files = fs.readdirSync(theme_path);

                        if(!files.empty) {
                            backdrop_themes[theme] = files;
                        }
                    }
                });
            }

            if(theme in backdrop_themes) {
                var file = backdrop_themes[theme][Math.floor((Math.random() * backdrop_themes[theme].length))];
                return "background-image: url('/img/backgrounds/" + theme + "/" + file + "');".replace(/ /g, '');
            } else {
                return req.backdrop(config.general.backdrop);
            }
        }
    }

    //Redirect
    if(req.subdomains.indexOf('www') === -1) {
        next();
    } else {
        res.redirect(req.protocol + "://" + req.host.split(".").slice(1).join(".") + req.path);
    }
}
