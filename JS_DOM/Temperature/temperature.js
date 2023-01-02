document.addEventListener("DOMContentLoaded", function () {
    var celsiusElementByName = document.getElementsByName("celsius");
    var fahrenheitElementByName = document.getElementsByName("fahrenheit");
    var kelvinElementByName = document.getElementsByName("kelvin");

    var celsiusValue = celsiusElementByName.values();
    var fahrenheitValue = celsiusValue * 1.8 + 32;
    var kelvinValue = celsiusValue - 273;

    var convertButton = document.querySelector("convert-button");
    convertButton.addEventListener("click", function (e) {

    })
});



