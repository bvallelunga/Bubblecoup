module.exports = function (db, models) {
    return db.define("bubbles_tags", {
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
