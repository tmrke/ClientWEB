function getFirstFiveElementsArray(array) {
    array.sort(function (e1, e2) {
        return e2 - e1;
    });

    return array.slice(0, 5);
}

function getLastFiveElementsArray(array) {
    array.sort(function (e1, e2) {
        return e2 - e1;
    });

    return array.slice(array.length - 5);
}

function getEvenNumbersSumArray(array) {
    return array.reduce(function (evenNumbersSum, currentNumber) {
        if (currentNumber % 2 === 0) {
            return evenNumbersSum + currentNumber;
        } else {
            return evenNumbersSum;
        }
    }, 0);
}

function getEvenNumbersSquaresArray(array) {
    return array
        .filter(function (value) {
            return value % 2 === 0
        })
        .map(function (value) {
            return value * value;
        });
}

(function () {
    var array1 = [10, 123.2123, 3, -2, 0, 2, 35.6, 789, 23, -85, 6];

    var firstFiveElementsArray = getFirstFiveElementsArray(array1);
    console.log("Первые пять элементов массива: {" + firstFiveElementsArray.join(", ") + "}");

    var lastFiveElementsArray = getLastFiveElementsArray(array1);
    console.log("Последние пять элементов массива: {" + lastFiveElementsArray.join(", ") + "}");

    var evenNumbersSumArray = getEvenNumbersSumArray(array1);
    console.log("Сумма четных чисел массива = " + evenNumbersSumArray);

    var array2 = [];

    for (var i = 1; i <= 100; i++) {
        array2.push(i);
    }

    console.log("Массив чисел от 1 до 100: {" + array2.join(", ") + "}");

    var evenNumbersSquaresArray = getEvenNumbersSquaresArray(array2);
    console.log("Список квадратов четных чисел массива: {" + evenNumbersSquaresArray.join(", ") + "}");
})();