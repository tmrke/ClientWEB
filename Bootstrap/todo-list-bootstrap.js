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
        var isTextNoteEmpty = newTodoListNoteText.length === 0;

        if (isTextNoteEmpty) {
            textInput.addClass("is-invalid");

            return;
        }

        textInput.removeClass("is-invalid");

        var newTodoListNote = $("<li>");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<div class='row my-2 align-items-center'>\
                    <div class='note-text offset-md-2 col-md-6 mb-2'>\
                        <span></span>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-primary edit-button w-100' title='Edit'>Edit</button>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-danger delete-button w-100' title='Delete'>Delete</button>\
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
            newTodoListNote.html("<form class='edit-form' novalidate>\
                    <div class='row my-2 px-0 align-items-stretch'>\
                        <div class='col-md-6 offset-md-2 mb-2'>\
                            <input type='text' class='edit-input form-control w-100' required>\
                            <div class='error-message invalid-feedback'>Note can't be empty</div>\
                        </div>\
                        <div class='col-6 col-md-2 pl-0'>\
                            <button class='btn btn-outline-primary save-button w-100'\
                                type='button'\
                                value='Save'\
                                title='Save'>\
                                    Save\
                            </button>\
                        </div>\
                        <div class='col-6 col-md-2'>\
                            <button class='btn btn-outline-danger cancel-button w-100' title='Cancel'>Cancel</button>\
                         </div>\
                    </div>\
                </form>");

            var editInput = newTodoListNote.find(".edit-input");
            editInput.val(newTodoListNoteText.trim());

            var saveButton = newTodoListNote.find(".save-button");
            var cancelButton = newTodoListNote.find(".cancel-button");

            cancelButton.click(function () {
                setViewMode();
            });

            saveButton.click(function () {
                if (editInput.val().trim().length === 0) {
                    editInput.addClass("is-invalid");

                    return;
                }

                editInput.removeClass("is-invalid");

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});