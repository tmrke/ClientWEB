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

        var phoneNumber = phoneNumberInput.mask("+7(999)999-99-99").val();

        phoneNumberInput.removeClass("invalid");
        phoneErrorMessage.removeClass("invalid");
        phoneErrorMessage.text("Номер введен некорректно, введите в формате: +7(999)999-99-99");

        if (phoneNumber.length === 0) {
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
            phoneErrorMessage.text("Номер введен некорректно, введите в формате: +7(999)999-99-99");
        }

        if (!isCorrect) {
            return;
        }

        phonesNumbers.push(phoneNumber);

        var deleteButton = $("<button class='delete-button' data-bs-toggle='modal' data-bs-target='#modal-dialog'>Удалить</button>");
        var rowsCount = $("#contacts-table tr").length;
        var modalDialog = $("<div class='modal fade' id='modal-dialog' tabindex='-1' aria-labelledby='modal-dialog-label' aria-hidden='true'>\
                                 <div class='modal-dialog'>\
                                     <div class='modal-content'>\
                                        <div class='modal-header'>\
                                            <h5 class='modal-title' id='modal-dialog-label'>Вы уверены?</h5>\
                                        </div>\
                                        <div class='modal-footer'>\
                                            <button class='btn bg-danger' data-bs-dismiss='modal' id='yes-button'>Да</button>\
                                            <button class='btn btn-success' data-bs-dismiss='modal' id='no-button'>Нет</button>\
                                        </div>\
                                     </div>\
                                 </div>\
                             </div>")
        var newRow = $("<tr></tr>")
            .append($("<td></td>").text(rowsCount))
            .append($("<td></td>").text(nameInputText))
            .append($("<td></td>").text(lastNameInputText))
            .append($("<td></td>").text(phoneNumber))
            .append(deleteButton).append(modalDialog);

        newRow.appendTo(table);

        $("#yes-button").click(function (e) {
            e.stopPropagation();
            newRow.remove();

            function updateTableNumeration() {
                $(".contacts-table tr").each(function (positionNumber) {
                    $(this).find("td:first").text(positionNumber);
                });
            }

            updateTableNumeration();
            phonesNumbers.splice(phonesNumbers.indexOf(phoneNumber));
        });

        deleteButton.click(function (e) {
            e.stopPropagation();
        });


        nameInput.val("");
        lastNameInput.val("");
        phoneNumberInput.mask("+7(999)999-99-99").val("");
    });
});

