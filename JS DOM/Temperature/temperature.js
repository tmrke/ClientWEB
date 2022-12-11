document.addEventListener("DOMContentLoaded", function () {
    var celsiusInput = document.getElementById("celsius-input");
    var fahrenheitInput = document.getElementById("fahrenheit-input");
    var kelvinInput = document.getElementById("kelvin-input");
    var button = document.getElementById("button");
    console.log(button);
    var form = document.getElementById("form");

    button.addEventListener("click", function () {
        var celsiusValue = Number(celsiusInput.value);
        var fahrenheitValue = 1.8 * celsiusValue + 32;
        var kelvinValue = +celsiusValue + +273.15;

        if (!isFinite(celsiusValue)) {
            alert("Ввденое значение должно быть числом");
        } else {
            fahrenheitInput.value = fahrenheitValue;
            kelvinInput.value = kelvinValue;
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });
})

