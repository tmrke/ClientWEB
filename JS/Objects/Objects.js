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

    russiaCountry.name = "Russia";
    russiaCountry.cities = [moscowCity, vladivostokCity, sochiCity];

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
    
    console.log(russiaCountry)
})();