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
        errorMessageVisible(false);

        if (newTodoListNoteText.length === 0) {
            errorMessageVisible(true);

            return;
        }

        var newTodoListNote = document.createElement("li");
        todoList.appendChild(newTodoListNote);

        setViewMode();

        function errorMessageVisible(visible) {
            if (visible === true) {
                textInput.classList.add("invalid");
                errorMessage.classList.remove("error-message-hidden");
                errorMessage.classList.add("error-message-visible");
            } else {
                errorMessage.classList.remove("error-message-visible");
                errorMessage.classList.add("error-message-hidden");
                textInput.classList.remove("invalid");
            }
        }

        function setViewMode() {
            newTodoListNote.innerHTML = "<span></span>" +
                "<button class='edit-button' id='edit-button' title='edit'><img src='/JS-DOM/TODO-List/resources/edit.png' alt='edit'>" +
                "<button class='delete-button' id='delete-button' title='delete'><img src='/JS-DOM/TODO-List/resources/delete.png' alt='delete'>";

            newTodoListNote.firstChild.textContent = newTodoListNoteText;
            textInput.value = "";

            newTodoListNote.querySelector(".delete-button").addEventListener("click", function () {
                newTodoListNote.remove();
            });

            newTodoListNote.querySelector(".edit-button").addEventListener("click", function () {
                setEditMode();
            })
        }

        function setEditMode() {
            newTodoListNote.innerHTML = "<div><input type='text' class='edit-input'>\
                <button class='save-button' id='save-button' title='save'>\
                <img src='/JS-DOM/TODO-List/resources/save.png' alt='save'>\
                <button class='cancel-button' id='cancel-button' title='cancel'>\
                <img src='/JS-DOM/TODO-List/resources/cancel.png' alt='cancel'></div>" +
                "<div id='edit-error-message' class='is-error-message-hidden'>Note can't be empty</div>";

            var editInput = newTodoListNote.querySelector(".edit-input");
            editInput.value = newTodoListNoteText;

            var saveButton = newTodoListNote.querySelector(".save-button");
            var cancelButton = newTodoListNote.querySelector(".cancel-button");

            cancelButton.addEventListener("click", function () {
                setViewMode();
            });

            saveButton.addEventListener("click", function () {
                var editErrorMessage = document.getElementById("edit-error-message");

                if (editInput.value.length === 0) {
                    editErrorMessage.classList.remove("error-message-hidden");
                    editErrorMessage.classList.add("error-message-visible");
                    editInput.classList.add("invalid");

                    return;
                }

                newTodoListNoteText = editInput.value;
                setViewMode();
            });
        }
    });
});