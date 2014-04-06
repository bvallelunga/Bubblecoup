module.exports = function (models) {
    //Create Guides
    models.guides.clear(function() {
        models.guides.create([
            {
                id: 1,
                name: "All American",
                slug: "american"
            },
            {
                id: 2,
                name: "Critters From The Sea",
                slug: "seacritters"
            },
            {
                id: 3,
                name: "Hot n' Spicy",
                slug: "hotnspicy"
            },
            {
                id: 4,
                name: "South American",
                slug: "southamericano"
            },
            {
                id: 5,
                name: "Drink 'til You Drop",
                slug: "drink"
            },
            {
                id: 6,
                name: "Asian",
                slug: "asian"
            },
            {
                id: 7,
                name: "European",
                slug: "european"
            },
            {
                id: 8,
                name: "Mediterranean",
                slug: "mediterranean"
            }
        ], lib.error.capture(true));
    });
}
