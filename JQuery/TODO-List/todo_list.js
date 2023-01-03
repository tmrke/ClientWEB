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

        if (newTodoListNoteText.length === 0) {
            textInput.toggleClass("invalid", true);
            errorMessage.toggleClass("is-error-message-hidden", false);

            return;
        }

        errorMessage.toggleClass("is-error-message-hidden", true);

        var newTodoListNote = $("<li>").addClass("new-todo-list-note");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<table class='note'>\
            <td>\
            <span class='note-text'></span>\
            </td>\
           <td>\
           <button class='edit-button' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
           </td>\
           <td>\
           <button class='delete-button' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
           </td>\
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
                    <div class='is-error-message-hidden error-message' id='error-message'>Note can't be empty</div>\
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