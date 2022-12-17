$(function () {
    var textInput = $("#text-input");
    var addButton = $("#add-button");
    var todoList = $("#list");
    var form = $("#form");
    var errorMessage = $("#error-message");

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        var newTodoListNoteText = textInput.val().trim();
        errorMessageVisible(false);

        if (newTodoListNoteText.length === 0) {
            errorMessageVisible(true);

            return;
        }

        var newTodoListNote = $("<li>").addClass("new-todo-list-note");
        todoList.append(newTodoListNote);

        setViewMode();

        function errorMessageVisible(visible) {
            if (visible === true) {
                textInput.addClass("invalid");
                errorMessage.removeClass("error-message-hidden");
                errorMessage.addClass("error-message-visible");
            } else {
                errorMessage.removeClass("error-message-visible");
                errorMessage.addClass("error-message-hidden");
                textInput.removeClass("invalid");
            }
        }

        function setViewMode() {
            newTodoListNote.html("<span id='span'></span>" +
                "<button class='edit-button' id='edit-button' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'>" +
                "<button class='delete-button' id='delete-button' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'>");

            newTodoListNote.find("#span").text(newTodoListNoteText);
            textInput.val("");

            newTodoListNote.find(".delete-button").click(function () {
                newTodoListNote.remove();
            });

            newTodoListNote.find(".edit-button").click(function () {
                setEditMode();
            });
        }

        function setEditMode() {
            newTodoListNote.html("<div><input type='text' class='edit-input'>\
                <button class='save-button' id='save-button' title='save'>\
                <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'>\
                <button class='cancel-button' id='cancel-button' title='cancel'>\
                <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></div>" +
                "<div id='edit-error-message' class='error-message-hidden'>Note can't be empty</div>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText);

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                var editErrorMessage = $("#edit-error-message");

                if (editInput.val().length === 0) {
                    editErrorMessage.removeClass("error-message-hidden");
                    editErrorMessage.addClass("error-message-visible");
                    editInput.addClass("invalid");

                    return;
                }

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});