var orm = require("orm");
var paging = require("orm-paging");
var random = require("orm-random");
var modts = require('orm-timestamps');

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

        /* Sync Orm */
        db.sync(callback);
    }
});
