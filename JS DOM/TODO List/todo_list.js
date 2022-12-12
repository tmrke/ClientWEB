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

        function setViewMode(){

        }

        var newTodoListNote = document.createElement("li");
        todoList.appendChild(newTodoListNote);

        newTodoListNote.innerHTML = "<span></span>\<" +
            "button class='edit-button' id='edit-button'>\<" +
            "img src='/JS DOM/TODO List/edit.png' alt='edit'>\<" +
            "button class='delete-button' id='delete-button'>\<" +
            "img src='/JS DOM/TODO List/delete.png' alt='edit'>";

        newTodoListNote.firstChild.textContent = newTodoListNoteText;

        textInput.value = "";

        newTodoListNote.querySelector(".delete-button").addEventListener("click", function () {
            newTodoListNote.remove();
        });

        newTodoListNote.querySelector(".edit-button").addEventListener("click", function () {
            newTodoListNote.innerHTML = "<input type='text' class='edit-input'>\
            <button class='save-button' id='save-button'>\
                <img src='/JS DOM/TODO List/save.png' alt='save'>\
            <button class='save-button' id='save-button'>\
                <img src='/JS DOM/TODO List/cancel.png' alt='cancel'>";

            newTodoListNote.querySelector(".edit-input").value = newTodoListNoteText;
        });
    });
});