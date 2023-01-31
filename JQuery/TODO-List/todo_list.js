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
        var isEmptyNoteText = newTodoListNoteText.length === 0;

        textInput.toggleClass("invalid", isEmptyNoteText);
        errorMessage.toggleClass("is-invisible", !isEmptyNoteText);

        if (isEmptyNoteText) {
            return;
        }

        var newTodoListNote = $("<li>").addClass("new-todo-list-note");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<div class='note'>\
                    <span class='note-text'></span>\
                    <button class='edit-button note-button' title='Edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
                    <button class='delete-button note-button' title='Delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
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
            newTodoListNote.html("<div class='note'>\
                    <input type='text' class='edit-input'>\
                    <button class='save-button note-button' title='Save'>\
                    <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'></button>\
                    <button class='cancel-button note-button' title='Cancel'>\
                    <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></button>\
               </div>\
               <div class='error-message is-invisible'>Note can't be empty</div>");

            var editInput = newTodoListNote.find(".edit-input");

            editInput.keyup(function (e) {
                if (e.keyCode === 13) {
                    saveButton.click();
                }
            });

            editInput.val(newTodoListNoteText.trim());

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                var isEmptyEditText = editInput.val().trim().length === 0;
                editInput.toggleClass("invalid", isEmptyEditText);
                newTodoListNote.find(".error-message").toggleClass("is-invisible", !isEmptyEditText);

                if (isEmptyEditText) {
                    return;
                }

                newTodoListNoteText = editInput.val().trim();
                setViewMode();
            });
        }
    });
});