$(function () {
    var table = $("#table");
    var nameInput = $("#nameInput");
    var lastNameInput = $("#lastNameInput");
    var phoneNumberInput = $("#phoneNumberInput");
    var addButton = $("#addButton");
    var form = $("#form");
    var rowsCount = 0;

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        // validation

        rowsCount++;

        var nameInputText = nameInput.val().trim();
        var lastNameInputText = lastNameInput.val().trim();
        var phoneNumberInputText = phoneNumberInput.val().trim();
        var rowsCountText = rowsCount.valueOf();

        var newRow = $("<tr></tr>").append($("<td></td>").text(rowsCountText))
            .append($("<td></td>").text(nameInputText))
            .append($("<td></td>").text(lastNameInputText))
            .append($("<td></td>").text(phoneNumberInputText))
            .append($("<td>X</td>"));

        newRow.appendTo(table);
    });
});