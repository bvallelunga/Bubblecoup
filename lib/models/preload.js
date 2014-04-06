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

    //Create Bubbles
    models.bubbles.clear(function() {
        models.bubbles.create([
            {
                id: 1,
                name: "Alvarado Fish & Steak House",
                description: "Best fish and steak ever!!",
                original: 30,
                discount: 20,
                company_id: 1
            },
            {
                id: 2,
                name: "American Food and Margaritas",
                description: "Eat American food and drink alcohol, what more could you ask for?",
                original: 10,
                discount: 15,
                company_id: 1
            }
        ], lib.error.capture(true));
    });

    //Create Companies
    models.companies.clear(function() {
        models.companies.create([
            {
                id: 1,
                name: "Joes Crab Shack",
                description: "The best shack in Santa Cruz",
                phone: "310-840-2533",
                address: "156th_street",
                city: "santa_cruz",
                state: "california"
            }
        ], lib.error.capture(true));
    });
}
