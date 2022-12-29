(function () {
    var array1 = [10, 123.2123, 3, -2, 0, 2, 35.6, 789, 23, -85, 6];

    console.log("Array1 до сортировки: {" + array1.join(", ") + "}");

    array1.sort(function (e1, e2) {
        return e2 - e1;
    });

    console.log("Array1 после сортировки по убыванию: {" + array1.join(", ") + "}");

    function getFirst5ElementsArray(array) {
        return array.slice(0, 5);
    }

    var first5ElementsArray = getFirst5ElementsArray(array1);
    console.log("Первые пять элементов массива: {" + first5ElementsArray.join(", ") + "}");

    function getLast5ElementsArray(array) {
        return array.slice(-5);
    }

    var last5ElementsArray = getLast5ElementsArray(array1);
    console.log("Последние пять элементов массива: {" + last5ElementsArray.join(", ") + "}");

    function getEvenNumbersSum(array) {
        return array.reduce(function (evenNumbersSum, currentNumber) {
            if (currentNumber % 2 === 0) {
                return evenNumbersSum + currentNumber;
            }

            return evenNumbersSum;
        }, 0);
    }

    var evenNumbersSum = getEvenNumbersSum(array1);
    console.log("Сумма четных чисел массива = " + evenNumbersSum);

    var array2 = [];

    for (var i = 1; i <= 100; i++) {
        array2.push(i);
    }

    console.log("Массив чисел от 1 до 100: {" + array2.join(", ") + "}");

    function getEvenNumbersSquaresArray(array) {
        return array
            .filter(function (value) {
                return value % 2 === 0;
            })
            .map(function (value) {
                return value * value;
            });
    }

    var evenNumbersSquaresArray = getEvenNumbersSquaresArray(array2);
    console.log("Список квадратов четных чисел массива: {" + evenNumbersSquaresArray.join(", ") + "}");
})();