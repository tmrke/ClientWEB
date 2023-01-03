$(function () {
    var textInput = $("#text-input");
    var addButton = $("#add-button");
    var todoList = $("#list");
    var form = $("#form");

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        var newTodoListNoteText = textInput.val().trim();

        if (newTodoListNoteText.length === 0) {
            textInput.toggleClass("invalid", true);
            textInput.toggleClass("is-error-message-hidden", false);

            return;
        }

        textInput.toggleClass("invalid", false);
        textInput.toggleClass("is-error-message-hidden", true);

        var newTodoListNote = $("<li>");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<div class='new-todo-list-note row'>\
            <span class='note-text col-11 col-sm-5'></span>\
            <button class='edit-button col-5 col-sm-1' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
            <button class='delete-button col-5 col-sm-1' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
            </div>");

            newTodoListNote.find(".note-text").text(newTodoListNoteText);
            textInput.val("");

            newTodoListNote.find(".delete-button").click(function () {
                newTodoListNote.remove();
            });

            newTodoListNote.find(".edit-button").click(function () {
                setEditMode();
            });
        }

        function setEditMode() {
            newTodoListNote.html("<div class='note row'>\
                <input type='text' class='edit-input is-error-message-visible col-11 col-sm-5' placeholder='Note cant be empty'>\
                <button class='save-button col-5 col-sm-1' title='save'>\
                <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'></button>\
                <button class='cancel-button col-5 col-sm-1' title='cancel'>\
                <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></button></div>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText);

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                var editErrorMessage = newTodoListNote.find(".is-error-message-hidden");

                if (editInput.val().length === 0) {
                    editInput.toggleClass("invalid", true);
                    editErrorMessage.toggleClass("is-error-message-hidden", false);

                    return;
                }

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});