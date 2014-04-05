/*
    NOTE: this file bring all the assests into group.
    Managed by the node module piler
*/

/* Import NPM Module */
var piler = require("piler");
var fs = require("fs");

/* Initialize Piler */
var js = piler.createJSManager({ urlRoot: "/js/" });
var css = piler.createCSSManager({ urlRoot: "/css/" });

exports.init = function(app) {
    js.bind(app);
    css.bind(app);

    $.each(fs.readdirSync(__dirname + "/js/"), function(index, directory) {
        var path = __dirname + "/js/" + directory;

        if(fs.statSync(path).isDirectory()) {
            $.each(fs.readdirSync(path), function(index, file) {
                if(directory === "core") {
                    js.addFile(path + "/" + file);
                } else {
                    js.addFile(directory, path + "/" + file);
                }
            });
        }
    });

    $.each(fs.readdirSync(__dirname + "/less/"), function(index, directory) {
        var path = __dirname + "/less/" + directory;

        if(fs.statSync(path).isDirectory()) {
            $.each(fs.readdirSync(path), function(index, file) {
                if(directory === "core") {
                    css.addFile(path + "/" + file);
                } else {
                    css.addFile(directory, path + "/" + file);
                }
            });
        }
    });
}

exports.express = function(req, res, next) {
    req.js = js;
    req.css = css;
    next();
}
