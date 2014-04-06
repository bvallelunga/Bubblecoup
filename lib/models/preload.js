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
                name: "Authentic Irish Food",
                description: "Rosie McCann's specializes in twists on traditional Irish fare, tweaking classic Celtic dishes and drinks in a traditional pub setting.",
                original: 20,
                discount: 40,
                company_id: 1
            },
            {
                id: 2,
                name: "Good ol’ Burgers",
                description: "Jason Balestrieri, executive chef at Cantinetta Luca, turns his attentions from Italian cuisine to classic American food in the kitchen of 400 Degrees Gourmet Burgers & Fries.",
                original: 20,
                discount: 50,
                company_id: 2
            },
            {
                id: 3,
                name: "USDA Certified Steak",
                description: "At Village Corner Carmel Bistro, diners feast in the lush environment of a café, surrounded by warm-hued adobe walls, a leafy garden, and an expanse of open sky. Guests dine on the open-air patio, or cozy up indoors to plates of pecan-crusted halibut or pan-roasted filet mignon.",
                original: 35,
                discount: 46,
                company_id: 3
            },
            {
                id: 4,
                name: "Noodles and Pasta",
                description: "Since 1994, Chef Dilip of Loose Noodle Pasta House has treated diners as he would treat guests at his own home, always making sure they feel welcome and leave with a full belly.",
                original: 40,
                discount: 35,
                company_id: 4
            },
            {
                id: 5,
                name: "Southern Style BBQ",
                description: "Hankerings for classic, all-American barbecue can easily be satisfied at Carmona's BBQ Deli, an eatery that operates out of a Watsonville deli and a mobile trailer powered by barbecue sauce rather than gasoline.",
                original: 45,
                discount: 20,
                company_id: 5
            },
            {
                id: 6,
                name: "Classic Sandwich",
                description: "After a day of playing beach volleyball and paddleboarding, beachgoers can head to Margaritaville for a bite to eat and a cool drink.",
                original: 86,
                discount: 33,
                company_id: 6
            },
            {
                id: 7,
                name: "Fried and Grilled Food",
                description: "The black-and-white photographs lining Alvarado Fish & Steak House's dining room aren't the only way the DiGirolamos show pride in their family history.",
                original: 90,
                discount: 27,
                company_id: 7
            },
            {
                id: 8,
                name: "Fresh Mexican Food",
                description: "Drawing from a menu brimming with traditional Mexican and Salvadorian dishes, chefs at Chelitos Pupuseria envelop dumpling-like pupusas filled with seasoned pork, cheese, and beans in corn and rice dough.",
                original: 150,
                discount: 30,
                company_id: 8
            },
            {
                id: 9,
                name: "Authentic Italian food",
                description: "The only Argentine-inspired restaurant in Santa Cruz, Star Bene serves “super comfort food,” as described by Christina Walters of Metro Active. Inside the low-lit dining room, which is reminiscent of a beach cottage, servers uncork bottles of Italian and Californian wines to complement swirls of homemade pasta, slow-cooked meats, and diners’ ever-rosier cheeks.",
                original: 100,
                discount: 20,
                company_id: 9
            }
        ], lib.error.capture(true));
    });

    //Create Companies
    models.companies.clear(function() {
        models.companies.create([
            {
                id: 1,
                name: "Rosie McCann’s Irish Pub and Restaurant",
                phone: "(831) 426-9930",
                address: "1220 Pacific Ave",
                city: "Santa Cruz",
                state: "California"
            },
            {
                id: 2,
                name: "400 Degrees Burgers & Fries",
                phone: "(831) 244-0040",
                address: "710 Mission St",
                city: "Carmel",
                state: "California"
            },
            {
                id: 3,
                name: "Village Corner Carmel Bistro",
                phone: "(831) 624-3588",
                address: "6 Dolores St",
                city: "Carmel",
                state: "California"
            },
            {
                id: 4,
                name: "Loose Noodle Pasta House",
                phone: "(831) 641-0130",
                address: "538 Lighthouse Ave",
                city: "Monterey",
                state: "California"
            },
            {
                id: 5,
                name: "Carmona’s BBQ Deli",
                phone: "(831) 761-9160",
                address: "1040 E Lake Ave",
                city: "Watsonville",
                state: "California"
            },
            {
                id: 6,
                name: "Margaritaville",
                phone: "(831) 476-2263",
                address: "231 Esplanade",
                city: "Capitola",
                state: "California"
            },
            {
                id: 7,
                name: "Alvarado Fish and Steak House",
                phone: "(831) 717-4468",
                address: "481 Alvarado St",
                city: "Monterey",
                state: "California"
            },
            {
                id: 8,
                name: "Chelitos Pupuseria",
                phone: "(831) 466-6565",
                address: "107 Leonard St",
                city: "Santa Cruz",
                state: "California"
            },
            {
                id: 9,
                name: "Star Bene",
                phone: "(831) 466-6565",
                address: "2-1245 E Cliff Dr",
                city: "Santa Cruz",
                state: "California"
            }
        ], lib.error.capture(true));
    });
}
