(function () {
    var array = [10, 123.2123, 3, -2, 0, 2, 35.6, 789, 23, -85, 6];

    array.sort(function (e1, e2) {
        return e2 - e1;
    });

    console.log(array);
    console.log(array.slice(0, 5));
    console.log(array.slice(array.length - 5));

    console.log(array.reduce(function (evenNumbersSum, currentValue) {
        if (currentValue % 2 === 0) {
            return evenNumbersSum + currentValue;
        } else {
            return evenNumbersSum;
        }
    }, 0));
}());

(function () {
    var array = [];

    for (var i = 1; i < 100; i++) {
        array.push(i);
    }

    console.log(array);

    var squaresEvenNumbersArray = array.filter(function (value) {
        if (value % 2 === 0) {
            return value;
        }
    }).map(function (value) {
        return value * value;
    });

    /* var squaresEvenNumbersArray = array.filter(function (currentValue) {
        if (currentValue % 2 === 0) {
            return currentValue * currentValue;
        }
    });

    Почему не получается вот так?
    */

    console.log(squaresEvenNumbersArray);
})();