$(function () {
    var textInput = $("#text-input");
    var addButton = $("#add-button");
    var todoList = $("#list");
    var form = $("#form");
    var errorMessage = $("#error-message")

    form.submit(function (e) {
        e.preventDefault();
    });

    addButton.click(function () {
        var newTodoListNoteText = textInput.val().trim();
        var isTextNoteEmpty = newTodoListNoteText.length === 0;

        if (isTextNoteEmpty) {
            errorMessage.removeClass("d-none");
            textInput.addClass("is-invalid");

            return;
        }

        errorMessage.addClass("d-none");
        textInput.removeClass("is-invalid");

        var newTodoListNote = $("<li>");
        todoList.append(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.html("<div class='row my-2 gx-1 px-0 align-items-center'>\
                    <div class='note-text offset-md-2 col-12 col-md-6 px-0'>\
                        <span></span>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-primary edit-button' title='Edit'>Edit</button>\
                    </div>\
                    <div class='col-6 col-md-2'>\
                        <button class='btn btn-danger delete-button' title='Delete'>Delete</button>\
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
            newTodoListNote.html("<form class='was-validated edit-form' novalidate>\
                    <div class='row my-2 gx-1 px-0 align-items-stretch'>\
                        <div class='col-12 col-md-6  px-0 offset-md-2'>\
                            <input type='text' class='edit-input form-control' required>\
                            <div class='error-message invalid-feedback d-none'>Note can't be empty</div>\
                        </div>\
                        <div class='col-6 col-md-2'>\
                            <button class='btn btn-outline-primary save-button'\
                                type='button'\
                                value='Save'\
                                title='Save'\
                                aria-describedby='error-message'>\
                                    Save\
                            </button>\
                        </div>\
                        <div class='col-6 col-md-2'>\
                            <button class='btn btn-outline-danger cancel-button' title='Cancel'>Cancel</button>\
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
                var editNoteErrorMessage = newTodoListNote.find(".error-message");

                if (editInput.val().trim().length === 0) {
                    editNoteErrorMessage.removeClass("d-none");
                    editInput.addClass("is-invalid");

                    return;
                }

                editNoteErrorMessage.addClass("d-none");
                editInput.removeClass("is-invalid");

                newTodoListNoteText = editInput.val();
                setViewMode();
            });
        }
    });
});