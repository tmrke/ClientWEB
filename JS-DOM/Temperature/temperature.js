document.addEventListener("DOMContentLoaded", function () {
    var celsiusInput = document.getElementById("celsius-input");
    var fahrenheitInput = document.getElementById("fahrenheit-input");
    var kelvinInput = document.getElementById("kelvin-input");
    var button = document.getElementById("button");
    console.log(button);
    var form = document.getElementById("form");

    button.addEventListener("click", function () {
        var celsiusValue = Number(celsiusInput.value);

        if (!isFinite(celsiusValue) || celsiusInput.value.trim() === "") {
            alert("Введенное значение должно быть числом");
        } else {
            fahrenheitInput.value = 1.8 * celsiusValue + 32;
            kelvinInput.value = celsiusValue + 273.15;
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });
});

