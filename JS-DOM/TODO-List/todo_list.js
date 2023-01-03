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

            isErrorMessageVisible(false);

            if (newTodoListNoteText.length === 0) {
                isErrorMessageVisible(true);

                return;
            }

            var newTodoListNote = document.createElement("li");
            newTodoListNote.classList.add("new-todo-list-note");
            todoList.appendChild(newTodoListNote);

            setViewMode();

            function isErrorMessageVisible(isVisible) {
                if (isVisible === true) {
                    textInput.classList.add("invalid");
                    errorMessage.classList.remove("is-error-message-hidden");
                } else {
                    errorMessage.classList.add("is-error-message-hidden");
                    textInput.classList.remove("invalid");
                }
            }

            function setViewMode() {
                newTodoListNote.innerHTML = "<span class='note-text'></span>\
                <label class='buttons'>\
                <button class='edit-button' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'></button>\
                <button class='delete-button' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'></button>\
                </label>";

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
                newTodoListNote.innerHTML = "<div class='note'><input type='text' class='edit-input'>\
                <button class='save-button' title='save'>\
                <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'></button>\
                <button class='cancel-button' title='cancel'>\
                <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></button></div>\
                <div class='is-error-message-visible error-message'>Note can't be empty</div>";

                var editInput = newTodoListNote.querySelector(".edit-input");
                editInput.value = newTodoListNoteText;

                var saveButton = newTodoListNote.querySelector(".save-button");
                var cancelButton = newTodoListNote.querySelector(".cancel-button");

                cancelButton.addEventListener("click", function () {
                    setViewMode();
                });

                saveButton.addEventListener("click", function () {
                    var editErrorMessage = newTodoListNote.querySelector(".is-error-message-visible");

                    if (editInput.value.length === 0) {
                        editInput.classList.add("invalid");
                        editErrorMessage.classList.remove("is-error-message-hidden");

                        return;
                    }

                    newTodoListNoteText = editInput.value;
                    setViewMode();
                });
            }
        }
    );
});



