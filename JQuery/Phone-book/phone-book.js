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
        var isCorrect = true;

        if (nameInputText.length === 0) {
            nameInput.addClass("invalid");
            nameErrorMessage.addClass("invalid");
            isCorrect = false;
        } else {
            nameInput.removeClass("invalid");
            nameErrorMessage.removeClass("invalid");
        }

        var lastNameInputText = lastNameInput.val().trim();

        if (lastNameInputText.length === 0) {
            lastNameInput.addClass("invalid");
            lastNameErrorMessage.addClass("invalid");
            isCorrect = false;
        } else {
            lastNameInput.removeClass("invalid");
            lastNameErrorMessage.removeClass("invalid");
        }

        var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        var phoneNumber = phoneNumberInput.val().trim();
        var isValid = regex.test(phoneNumber);

        if (phoneNumber.length === 0 || !isValid) {
            phoneNumberInput.addClass("invalid");
            phoneErrorMessage.addClass("invalid");

            isCorrect = false;
        } else if (phonesNumbers.indexOf(phoneNumber) !== -1) {
            phoneErrorMessage.text("Контакт с таким номером уже существует");
            phoneNumberInput.addClass("invalid");
            phoneErrorMessage.addClass("invalid");

            isCorrect = false;
        } else {
            phoneNumberInput.removeClass("invalid");
            phoneErrorMessage.removeClass("invalid");
            phoneErrorMessage.text("Номер введен некорректно, введите в формате: +79234567890");
        }

        if (!isCorrect) {
            return;
        }

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

            /*
            modalDialog.dialog({
                modal: true
            });
             */

            modalDialog.set(modalDialog.modal = true);

            modalDialog.click(function (e) {
                if ($(e.target).closest('.modal-dialog').length === 0) {
                    $(this).fadeOut();
                }
            });

            modalDialog.removeClass("modal-dialog-hidden");

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
                modalDialog.addClass("modal-dialog-hidden");
            });

            $("#no-button").click(function () {
                modalDialog.addClass("modal-dialog-hidden");
            });
        });

        nameInput.val("");
        lastNameInput.val("");
        phoneNumberInput.val("");
    });
});

