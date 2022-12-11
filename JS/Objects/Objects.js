(function () {
    var countries = [{
        name: "Russia",
        cities: [{
            name: "Moscow", population: 13010112
        }, {
            name: "Vladivostok", population: 600871
        }, {
            name: "Sochi", population: 466078
        }, {
            name: "Novosibirsk", population: 1633595
        }]
    }, {
        name: "USA",
        cities: [{
            name: "New York", population: 8467513
        }, {
            name: "Los Angeles", population: 3898747
        }, {
            name: "Vladivostok", population: 675647
        }]
    }, {
        name: "Mexico",
        cities: [{
            name: "Mexico", population: 9100000
        }, {
            name: "Tijuana", population: 1964788
        }]
    }];

    var citiesMaxCountsCountry = getMaxCitiesCountsCountry(countries);
    console.log(citiesMaxCountsCountry);

    var populationsByCountry = getPopulationsByCountry(countries);
    console.log(populationsByCountry);
})();

function getMaxCitiesCountsCountry(countries) {
    if (countries.length === 0) {
        return null;
    }

    countries.sort(function (country1, country2) {
        return country2.cities.length - country1.cities.length;
    });

    return countries.filter(function (country) {
        return country.cities.length === countries[0].cities.length;
    });
}

function getPopulationsByCountry(countries) {
    var populationsByCountry = {
        name: [],
        population: []
    };

    countries.forEach(function (country) {
        var name = country.name;
        var population = country.cities.reduce(function (sumPopulation, city) {
            return sumPopulation + city.population;
        }, 0)

        populationsByCountry.name.push(name);
        populationsByCountry.population.push(population);
    })

    return populationsByCountry;
}

