(function () {
    var russiaCountry = {};
    var usaCountry = {};
    var mexicoCountry = {};

    var moscowCity = {
        name: "Moscow",
        population: 13010112
    };

    var vladivostokCity = {
        name: "Vladivostok",
        population: 600871
    };

    var sochiCity = {
        name: "Sochi",
        population: 466078
    };

    var novosibirskCity = {
        name: "Novosibirsk",
        population: 1633595
    };

    russiaCountry.name = "Russia";
    russiaCountry.cities = [moscowCity, vladivostokCity, sochiCity, novosibirskCity];

    var newYorkCity = {
        name: "New York",
        population: 8467513
    };

    var bostonCity = {
        name: "Vladivostok",
        population: 675647
    };

    var losAngelesCity = {
        name: "Los Angeles",
        population: 3898747
    };

    usaCountry.name = "USA";
    usaCountry.cities = [newYorkCity, bostonCity, losAngelesCity];

    var mexicoCity = {
        name: "Mexico",
        population: 9100000
    };

    var tijuanaCity = {
        name: "Tijuana",
        population: 1964788
    };

    mexicoCountry.name = "Mexico";
    mexicoCountry.cities = [mexicoCity, tijuanaCity];

    var countries = [russiaCountry, usaCountry, mexicoCountry];

    countries.sort(function (country1, country2) {
        return country2.cities.length - country1.cities.length;
    });

    var maxCountCitiesCountry = countries.filter(function (country) {
        return country.cities.length === countries[0].cities.length;
    });

    console.log(maxCountCitiesCountry);

    var populationsByCountry = new Map();

    populationsByCountry.set(russiaCountry.name, russiaCountry.cities.reduce(function (sumPopulation, city) {
        var currentPopulation = city.population;
        return sumPopulation + currentPopulation;
    }, 0));

    populationsByCountry.set(usaCountry.name, usaCountry.cities.reduce(function (sumPopulation, city) {
        var currentPopulation = city.population;
        return sumPopulation + currentPopulation;
    }, 0));

    populationsByCountry.set(mexicoCountry.name, mexicoCountry.cities.reduce(function (sumPopulation, city) {
        var currentPopulation = city.population;
        return sumPopulation + currentPopulation;
    }, 0));


    /* похожий вопрос: почему нельзя сделать вот так?:
     populationsByCountry.set(mexicoCountry.name, mexicoCountry.cities.population.reduce(function (sumPopulation, currentPopulation) {
         return sumPopulation + currentPopulation;
     }, 0));
      */

    console.log(populationsByCountry);
})();