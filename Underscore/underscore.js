(function () {
    var persons = [
        {
            name: "person1", age: 10
        },
        {
            name: "person1", age: 20
        },
        {
            name: "person1", age: 30
        },
        {
            name: "person4", age: 40
        },
        {
            name: "person5", age: 50
        },
        {
            name: "person6", age: 60
        },
        {
            name: "person7", age: 70
        },
        {
            name: "person9", age: 80
        },
        {
            name: "person9", age: 90
        },
        {
            name: "person10", age: 100
        },
    ]

    var averageAge = _.reduce(persons, function (memo, p) {
        return memo + p.age;
    }, 0) / persons.length;

    console.log("Средний возраст людей: " + averageAge + " лет ");

    var between20And30PersonsNames = _.chain(persons)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .pluck("name")
        .sortBy()
        .value();

    console.log("Люди в возрасте от 20 до 30 лет: " + between20And30PersonsNames.join(", "));

    var between20And30PersonsUniqNames = _.chain(persons)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .pluck("name")
        .uniq()
        .sortBy()
        .value();

    console.log("Люди с уникальными именами в возрасте от 20 до 30 лет: " + between20And30PersonsUniqNames.join(", "));

    var personByNamesCount = {};

    persons.forEach(function (p) {
        var name = p.name;
        personByNamesCount[name] = _.chain(persons)
            .filter(function (p) {
                if (p.name === name) {
                    return name;
                }
            })
            .value()
            .length
    });

    console.log(personByNamesCount);
})();