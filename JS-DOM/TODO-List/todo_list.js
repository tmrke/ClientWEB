document.addEventListener("DOMContentLoaded", function () {
    var textInput = document.getElementById("text-input");
    var addButton = document.getElementById("add-button");
    var todoList = document.getElementById("list");
    var form = document.getElementById("form");
    var errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    addButton.addEventListener("click", function () {
        var newTodoListNoteText = textInput.value.trim();
        var isEmptyNoteText = newTodoListNoteText.length === 0;

        if (isEmptyNoteText) {
            textInput.classList.add("invalid");
            errorMessage.classList.remove("is-invisible");
        }

        if (isEmptyNoteText) {
            return;
        }

        textInput.classList.remove("invalid");
        errorMessage.classList.add("is-invisible");

        var newTodoListNote = document.createElement("li");
        newTodoListNote.classList.add("new-todo-list-note");
        todoList.appendChild(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.innerHTML = "<div class='note'>\
                    <span class='note-text'></span>\
                    <button class='edit-button note-button' title='Edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
                    <button class='delete-button note-button' title='Delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
                </div>";

            newTodoListNote.querySelector(".note-text").textContent = newTodoListNoteText;
            textInput.value = "";

            newTodoListNote.querySelector(".delete-button").addEventListener("click", function () {
                newTodoListNote.remove();
            });

            newTodoListNote.querySelector(".edit-button").addEventListener("click", function () {
                setEditMode();
            });
        }

        function setEditMode() {
            newTodoListNote.innerHTML = "<div class='note'>\
                    <input type='text' class='edit-input'>\
                    <button class='save-button note-button' title='Save'>\
                    <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'></button>\
                    <button class='cancel-button note-button' title='Cancel'>\
                    <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></button>\
               </div>\
               <div class='error-message is-invisible'>Note can't be empty</div>";

            var editInput = newTodoListNote.querySelector(".edit-input");
            editInput.value = newTodoListNoteText;

            var saveButton = newTodoListNote.querySelector(".save-button");
            var cancelButton = newTodoListNote.querySelector(".cancel-button");

            cancelButton.addEventListener("click", function () {
                setViewMode();
            });

            saveButton.addEventListener("click", function () {
                var isEmptyEditText = editInput.value.trim().length === 0;

                if (isEmptyEditText) {
                    editInput.classList.add("invalid");
                    newTodoListNote.querySelector(".error-message").classList.remove("is-invisible")
                }

                if (isEmptyEditText) {
                    return;
                }

                newTodoListNoteText = editInput.value;
                setViewMode();
            });

            editInput.addEventListener("keyup", function (e) {
                if (e.keyCode === 13) {
                    saveButton.click();
                }
            });
        }
    });
});



