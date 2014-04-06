var orm = require("orm");
var paging = require("orm-paging");
var random = require("orm-random");
var modts = require('orm-timestamps');
var init = false;

module.exports = orm.express(config.orm, {
    define: function (db, models, callback) {
        /* Settings */
        db.settings.set("properties.primary_key", "id");
        db.settings.set("instance.cache", false);
        db.settings.set("instance.autoSave", false);
        db.settings.set("instance.autoFetch", false);
        db.settings.set("instance.autoFetchLimit", 2);

        /* Use Plugins */
        db.use(random);
        db.use(paging);
        db.use(modts, {
            persist: true,
            createdProperty: 'created',
            modifiedProperty: 'modified',
            dbtype: {
                type: 'date',
                time: true
            },
            now: function() {
                return new Date();
            }
        });

        /* Define Models */
        models.users = require("./users")(db, models);
        models.guides = require("./guides")(db, models);
        models.bubbles = require("./bubbles")(db, models);
        models.bubbles.tags = require("./bubbles/tags")(db, models);
        models.bubbles.purchases = require("./bubbles/purchases")(db, models);

        /* Associations */
        models.guides.hasMany("bubbles", models.bubbles, {}, { reverse: "guides", autoFetch: true });

        models.bubbles.hasMany("tags", models.tags, {}, { reverse: "bubbles", autoFetch: true });
        models.bubbles.purchases.hasOne("owner", models.users);
        models.bubbles.purchases.hasOne("parent", models.bubbles.purchases, { reverse: "children",  autoFetch: true });

        /* Init */
        if(!init) {
            async.series([
                function(next) {
                    if(config.orm.reset) {
                        db.drop(next);
                    } else {
                        next();
                    }
                },
                function(next) {
                    if(config.orm.reset || config.orm.sync) {
                        db.sync(next);
                    } else {
                        next();
                    }
                },
                function(next) {
                    if(config.orm.reset || config.orm.preload) {
                        require("./preload")(models);
                    }

                    next();
                }
            ], function(errors) {
                init = true;
                lib.error.capture(errors);
                if(callback) callback();
            });
        } else if(callback) {
            callback();
        }
    }
});
