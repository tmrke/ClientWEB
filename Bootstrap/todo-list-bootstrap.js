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

        var newTodoListNote = $("<li>");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<div class='row my-2 gx-4 offset-md-2 ml-md-0 align-items-center'>\
                    <div class='note-text col-12 col-md-8 px-0'>\
                        <span></span>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-primary edit-button' title='edit'>edit</button>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-danger delete-button' title='delete'>delete</button>\
                    </div>\
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
            newTodoListNote.html("<form class='was-validated edit-form'>\
                    <div class='row my-2 gx-4 offset-md-2 ml-md-0 align-items-center'>\
                        <div class='col-12 col-md-8 px-0'>\
                            <input type='text' class='edit-input form-control' required>\
                        </div>\
                        <div class='col-6 col-md-2'>\
                            <input class='btn btn-outline-primary save-button' type='submit' value='save' title='save'>\
                        </div>\
                        <div class='col-6 col-md-2'>\
                            <button class='btn btn-outline-danger cancel-button' title='cancel'>cancel</button>\
                         </div>\
                    </div>\
                </form>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText);

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                if (editInput.val().trim().length === 0) {
                    return;
                }

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});