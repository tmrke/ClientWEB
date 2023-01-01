$(function () {
    var table = $("#contacts-table");
    var nameInput = $("#name-input");
    var lastNameInput = $("#last-name-input");
    var phoneNumberInput = $("#phone-number-input");
    var addButton = $("#add-button");
    var form = $("#form");
    var nameErrorMessage = $("#name-error-message")
    var lastNameErrorMessage = $("#last-name-error-message")
    var phoneErrorMessage = $("#phone-error-message")
    var phonesNumbers = [];

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        var nameInputText = nameInput.val().trim();

        if (nameInputText.length === 0) {
            nameInput.toggleClass("invalid", true);
            nameErrorMessage.toggleClass("invalid", true);

            return;
        }

        nameInput.toggleClass("invalid", false);
        nameErrorMessage.toggleClass("invalid", false);

        var lastNameInputText = lastNameInput.val().trim();

        if (lastNameInputText.length === 0) {
            lastNameInput.toggleClass("invalid", true);
            lastNameErrorMessage.toggleClass("invalid", true);

            return;
        }

        lastNameInput.toggleClass("invalid", false);
        lastNameErrorMessage.toggleClass("invalid", false);

        var regularExpression = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        var phoneNumber = phoneNumberInput.val().trim();
        var isValid = regularExpression.test(phoneNumber);


        if (phoneNumber.length === 0 || !isValid) {
            phoneNumberInput.toggleClass("invalid", true);
            phoneErrorMessage.toggleClass("invalid", true);

            return;
        }

        if (phonesNumbers.indexOf(phoneNumber) !== -1) {
            phoneErrorMessage.text("Контакт с таким номером уже существует");
            phoneNumberInput.toggleClass("invalid", true);
            phoneErrorMessage.toggleClass("invalid", true);

            return;
        }

        phoneNumberInput.toggleClass("invalid", false);
        phoneErrorMessage.toggleClass("invalid", false);
        phoneErrorMessage.text("Номер введен некорректно");

        phonesNumbers.push(phoneNumber);

        var deleteButton = $("<button class='delete-button'>Удалить</button>");
        var rowsCount = $("#contacts-table tr").length;
        var newRow = $("<tr></tr>")
            .append($("<td></td>").text(rowsCount))
            .append($("<td></td>").text(nameInputText))
            .append($("<td></td>").text(lastNameInputText))
            .append($("<td></td>").text(phoneNumber))
            .append(deleteButton);

        newRow.appendTo(table);

        deleteButton.click(function () {
            var modalDialog = $("#modal-dialog");

            modalDialog.toggleClass("modal-dialog-hidden", false);

            $("#yes-button").click(function () {
                newRow.remove();

                function updateTableNumeration() {
                    $(".contacts-table tr").each(function (positionNumber) {
                        $(this).find("td:first").text(positionNumber);
                    });
                }

                $.ajax({
                    success: function () {
                        updateTableNumeration();
                    }
                });

                phonesNumbers.splice(phonesNumbers.indexOf(phoneNumber));

                modalDialog.toggleClass("modal-dialog-hidden", true);
            });

            $("#no-button").click(function () {
                modalDialog.toggleClass("modal-dialog-hidden", true);
            });
        });

        nameInput.val("");
        lastNameInput.val("");
        phoneNumberInput.val("");
    });
});