(function () {
    var persons = [
        {
            name: "person1",
            age: 10
        },
        {
            name: "person2",
            age: 20
        },
        {
            name: "person2",
            age: 30
        },
        {
            name: "person4",
            age: 25
        },
        {
            name: "person5",
            age: 28
        },
        {
            name: "person6",
            age: 60
        },
        {
            name: "person7",
            age: 70
        },
        {
            name: "person9",
            age: 80
        },
        {
            name: "person9",
            age: 90
        },
        {
            name: "person10",
            age: 100
        },
    ]

    var averageAge = _.reduce(persons, function (agesSum, p) {
        return agesSum + p.age;
    }, 0) / persons.length;

    console.log("Средний возраст людей: " + averageAge + " лет ");

    var between20And30PersonsNames = _.chain(persons)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .sortBy("age")
        .value();

    console.log("Люди в возрасте от 20 до 30 лет");
    console.log(between20And30PersonsNames);

    var between20And30PersonsUniqueNames = _.chain(persons)
        .filter(function (p) {
            return p.age >= 20 && p.age <= 30;
        })
        .pluck("name")
        .uniq()
        .sortBy()
        .reverse()
        .value();

    console.log("Люди с уникальными именами в возрасте от 20 до 30 лет: " + between20And30PersonsUniqueNames.join(", "));

    var personsByNamesCount = {};

    persons.map(function (p) {
        var name = p.name;
        personsByNamesCount[name] = _.chain(persons)
            .filter(function (p) {
                return p.name === name;
            })
            .value()
            .length
    });

    // еще вот такой вариант нашел: var personsByNamesCount = _.countBy(persons, "name");

    console.log(personsByNamesCount);
})();