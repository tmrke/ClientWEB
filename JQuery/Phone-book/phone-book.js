$(function () {
    var table = $("#contacts-table");
    var nameInput = $("#name-input");
    var lastNameInput = $("#last-name-input");
    var phoneNumberInput = $("#phone-number-input").mask("+7(999)999-99-99");
    var addButton = $("#add-button");
    var form = $("#form");
    var nameErrorMessage = $("#name-error-message");
    var lastNameErrorMessage = $("#last-name-error-message");
    var phoneErrorMessage = $("#phone-error-message");
    var phoneNumbers = [];
    var modalDialog = $("#modal-dialog");
    var deletableContact = null;

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

        var phoneNumber = phoneNumberInput.val();

        phoneNumberInput.removeClass("invalid");
        phoneErrorMessage.removeClass("invalid");

        if (phoneNumber.length === 0) {
            phoneNumberInput.addClass("invalid");
            phoneErrorMessage.addClass("invalid");
            phoneErrorMessage.text("Номер введен некорректно, введите в формате: +7(999)999-99-99");

            isCorrect = false;
        } else if (phoneNumbers.indexOf(phoneNumber) !== -1) {
            phoneErrorMessage.text("Контакт с таким номером уже существует");
            phoneNumberInput.addClass("invalid");
            phoneErrorMessage.addClass("invalid");

            isCorrect = false;
        } else {
            phoneNumberInput.removeClass("invalid");
            phoneErrorMessage.removeClass("invalid");
        }

        if (!isCorrect) {
            return;
        }

        phoneNumbers.push(phoneNumber);

        var rowsCount = $("#contacts-table tr").length;
        var newRow = $("<tr></tr>")
            .append($("<td></td>").text(rowsCount))
            .append($("<td></td>").text(nameInputText))
            .append($("<td></td>").text(lastNameInputText))
            .append($("<td></td>").text(phoneNumber))
            .append($("<td><button class='delete-button' data-bs-toggle='modal' data-bs-target='#modal-dialog'>Удалить</button></td>"));

        var deleteButton = newRow.find(".delete-button");
        newRow.appendTo(table);

        deleteButton.click(function () {
            deletableContact = deleteButton.parent().parent();
        });

        modalDialog.find(".yes-button").click(function (e) {
            deletableContact.remove();
            e.stopImmediatePropagation();

            $(".contacts-table tr").each(function (positionNumber) {
                $(this).find("td:first").text(positionNumber);
            });

            phoneNumbers = phoneNumbers.filter(function (existingPhoneNumber) {
                return existingPhoneNumber !== phoneNumber;
            });
        });

        nameInput.val("");
        lastNameInput.val("");
        phoneNumberInput.mask("+7(999)999-99-99").val("");
    });
});

