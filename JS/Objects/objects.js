(function () {
    var countries = [
        {
            name: "Russia",
            cities: [
                {
                    name: "Moscow",
                    population: 13010112
                },
                {
                    name: "Vladivostok",
                    population: 600871
                },
                {
                    name: "Sochi",
                    population: 466078
                },
                {
                    name: "Novosibirsk",
                    population: 1633595
                }
            ]
        },
        {
            name: "USA",
            cities: [
                {
                    name: "New York",
                    population: 8467513
                },
                {
                    name: "Los Angeles",
                    population: 3898747
                },
                {
                    name: "Boston",
                    population: 675647
                }
            ]
        },
        {
            name: "Mexico",
            cities: [
                {
                    name: "Mexico",
                    population: 9100000
                },
                {
                    name: "Tijuana",
                    population: 1964788
                }
            ]
        }
    ];

    function getCitiesMaxCountCountries(countries) {
        var citiesMaxCount = countries.reduce(function (citiesCount, country) {
            return Math.max(citiesCount, country.cities.length);
        }, 0);

        return countries.filter(function (country) {
            return country.cities.length === citiesMaxCount;
        });
    }

    function getPopulationsByCountry(countries) {
        var populationsByCountry = {};

        countries.forEach(function (country) {
            populationsByCountry[country.name] = country.cities.reduce(function (sumPopulation, city) {
                return sumPopulation + city.population;
            }, 0);
        });

        return populationsByCountry;
    }

    var citiesMaxCountCountries = getCitiesMaxCountCountries(countries);
    console.log(citiesMaxCountCountries);

    var populationsByCountry = getPopulationsByCountry(countries);
    console.log(populationsByCountry);
})();



