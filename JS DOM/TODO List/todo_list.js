document.addEventListener("DOMContentLoaded", function () {
    var textInput = document.getElementById("text-input");
    var addButton = document.getElementById("add-button");
    var todoList = document.getElementById("list");
    var form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    addButton.addEventListener("click", function () {
        var newTodoListNoteText = textInput.value.trim();

        if (newTodoListNoteText.length === 0) {
            return;
        }

        var newTodoListNote = document.createElement("li");
        todoList.appendChild(newTodoListNote);

        setViewMode();

        function setViewMode() {
            newTodoListNote.innerHTML = "<span></span>\<" +
                "button class='edit-button' id='edit-button'>\<" +
                "img src='/JS%20DOM/TODO%20List/resources/edit.png' alt='edit'>\<" +
                "button class='delete-button' id='delete-button'>\<" +
                "img src='/JS%20DOM/TODO%20List/resources/delete.png' alt='edit'>";

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
            newTodoListNote.innerHTML = "<input type='text' class='edit-input'>\
            <button class='save-button' id='save-button'>\
                <img src='/JS%20DOM/TODO%20List/resources/save.png' alt='save'>\
            <button class='cancel-button' id='cancel-button'>\
                <img src='/JS%20DOM/TODO%20List/resources/cancel.png' alt='cancel'>";

            var editInput = newTodoListNote.querySelector(".edit-input");
            editInput.value = newTodoListNoteText;

            var saveButton = newTodoListNote.querySelector(".save-button");
            var cancelButton = newTodoListNote.querySelector(".cancel-button");

            cancelButton.addEventListener("click", function () {
                setViewMode();
            });

            saveButton.addEventListener("click", function () {
                if (editInput.value.length === 0) {
                    return;
                }

                newTodoListNoteText = editInput.value;
                setViewMode();
            })
        }
    });
});