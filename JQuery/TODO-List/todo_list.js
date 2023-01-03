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
        errorMessage.toggleClass("error-message", !isEmptyNoteText);

        if (isEmptyNoteText) {
            return;
        }

        textInput.toggleClass("invalid", isEmptyNoteText);
        errorMessage.toggleClass("error-message", isEmptyNoteText);

        textInput.toggleClass("invalid", false);
        errorMessage.toggleClass("error-message", true);

        var newTodoListNote = $("<li>").addClass("new-todo-list-note");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<table class='note'>\
                <tr>\
                    <td>\
                        <span class='note-text'></span>\
                    </td>\
                    <td>\
                        <button class='edit-button' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
                    </td>\
                    <td>\
                        <button class='delete-button' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
                    </td>\
                </tr>\
            </table>");

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
            newTodoListNote.html("<table class='note'>\
            <tr>\
                <td >\
                    <input type='text' class='edit-input'>\
                </td>\
                \<td>\
                    <button class='save-button' title='save'>\
                    <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'></button>\
                </td>\
                \<td>\
                    <button class='cancel-button' title='cancel'>\
                    <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></button>\
                </td>\
            </tr>\
            <tr>\
                <td>\
                    <div class='error-message is-error-message-visible'>Note can't be empty</div>\
                </td>\
            </tr>\
            </table>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText);

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                var isEmptyEditText = editInput.val().trim().length === 0;

                editInput.toggleClass("invalid", isEmptyEditText);
                newTodoListNote.find(".is-error-message-visible").toggleClass("error-message", !isEmptyEditText);

                if (isEmptyEditText) {
                    return;
                }

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});