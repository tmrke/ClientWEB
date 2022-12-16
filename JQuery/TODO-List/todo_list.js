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
            return;
        }

        var newTodoListNote = $("<li>").addClass("new-todo-list-note");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<span id='span'></span>\<" +
                "button class='edit-button' id='edit-button'>\<" +
                "img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'>\<" +
                "button class='delete-button' id='delete-button'>\<" +
                "img src='/JS-DOM/TODO-List/resources/delete.png' alt='edit'>");

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
            newTodoListNote.html("<input type='text' class='edit-input'>\
            <button class='save-button' id='save-button'>\
                <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'>\
            <button class='cancel-button' id='cancel-button'>\
                <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText);

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                if (editInput.val().length === 0) {
                    return;
                }

                newTodoListNoteText = editInput.val();
                setViewMode();
            })
        }
    });
});