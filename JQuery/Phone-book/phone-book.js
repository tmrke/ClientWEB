$(function () {
    var table = $("#table");
    var nameInput = $("#nameInput");
    var lastNameInput = $("#lastNameInput");
    var phoneNumberInput = $("#phoneNumberInput");
    var addButton = $("#addButton");
    var form = $("#form");
    var nameErrorMessage = $("#nameErrorMessage")
    var lastNameErrorMessage = $("#lastNameErrorMessage")
    var phoneErrorMessage = $("#phoneErrorMessage")

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        var nameInputText = nameInput.val().trim();
        var lastNameInputText = lastNameInput.val().trim();
        var phoneNumber = phoneNumberInput.val().trim();
        var rowsCount = $("table tr").length;
        var rowsCountText = rowsCount.valueOf();

        if (nameInputText.length === 0) {
            nameInput.toggleClass("invalid", true);
            nameErrorMessage.toggleClass("inputErrorMessageHidden", false).toggleClass("inputErrorMessageVisible", true);

            return;
        }

        nameInput.toggleClass("invalid", false);
        nameErrorMessage.toggleClass("inputErrorMessageHidden", true).toggleClass("inputErrorMessageVisible", false);

        if (lastNameInputText.length === 0) {
            lastNameInput.toggleClass("invalid", true);
            lastNameErrorMessage.toggleClass("inputErrorMessageHidden", false).toggleClass("inputErrorMessageVisible", true);

            return;
        }

        lastNameInput.toggleClass("invalid", false);
        lastNameErrorMessage.toggleClass("inputErrorMessageHidden", true).toggleClass("inputErrorMessageVisible", false);

        if (phoneNumber.length !== 11) {
            phoneNumberInput.toggleClass("invalid", true);
            phoneErrorMessage.toggleClass("inputErrorMessageHidden", false).toggleClass("inputErrorMessageVisible", true);

            return;
        }

        phoneNumberInput.toggleClass("invalid", false);
        phoneErrorMessage.toggleClass("inputErrorMessageHidden", true).toggleClass("inputErrorMessageVisible", false);

        var deleteButton = $(("<button class='deleteButton'>Удалить</button>"));
        var newRow = $("<tr></tr>")
            .append($("<td></td>").text(rowsCountText))
            .append($("<td></td>").text(nameInputText))
            .append($("<td></td>").text(lastNameInputText))
            .append($("<td></td>").text(phoneNumber))
            .append(deleteButton);

        newRow.appendTo(table);

        deleteButton.click(function () {
            newRow.remove();

            function updateTableNumeration() {
                $(".table tr").each(function (positionNumber) {
                    $(this).find("td:first").text(positionNumber);
                });
            }

            $.ajax({
                success: function () {
                    updateTableNumeration();
                }
            });
        });

        nameInput.val("");
        lastNameInput.val("");
        phoneNumberInput.val("");
    });
});