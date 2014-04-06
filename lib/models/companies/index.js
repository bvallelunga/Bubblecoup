var rand = require("generate-key");

module.exports = function (db, models) {
    return db.define("companies", {
        pub_id: String,
        name: String,
        description: String,
        phone: String,
        address: String,
        city: String,
        state: String
    }, {
        timestamp: true,
        hooks: {
            beforeCreate: function() {
                this.pub_id = rand.generateKey(Math.floor(Math.random() * 15) + 15);
            },
            beforeSave: function() {
                this.address = this.address.toLowerCase().replace(/ /g, "_");
                this.city = this.city.toLowerCase().replace(/ /g, "_");
                this.state = this.state.toLowerCase().replace(/ /g, "_");
            },
            afterLoad: function() {
                this.location = "%s, %s, %s".sprintf([
                    this.address.replace(/_/g, " "),
                    this.city.replace(/_/g, " "),
                    this.state.replace(/_/g, " "),
                ]);
            }
        },
        validations: {
            pub_id: db.enforce.unique()
        }
    });
};
