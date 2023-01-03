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
            <span class='note-text col-11 col-md-5'></span>\
            <button class='btn btn-primary edit-button col-5 col-md-1' title='edit'>edit</button>\
            <button class='btn btn-danger delete-button col-5 col-md-1' title='delete'>delete</button>\
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
                <input type='text' class='edit-input is-error-message-visible col-11 col-md-5' placeholder='Note cant be empty'>\
                <button class='btn btn-outline-primary save-button col-5 col-md-1' title='save'>save</button>\
                <button class='btn btn-outline-danger cancel-button col-5 col-md-1' title='cancel'>cancel</button></div>");

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