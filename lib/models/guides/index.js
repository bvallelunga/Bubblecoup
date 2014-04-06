module.exports = function (db, models) {
    return db.define("guides", {
        slug: String,
        name: String
    }, {
        timestamp: true,
        validations: {
            slug: db.enforce.unique(),
            name: db.enforce.unique()
        }
    });
};
