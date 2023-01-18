new Vue({
    el: "#app",

    data: {
        contacts: [],
        id: 1,
        name: "",
        lastName: "",
        phone: "",
        deletableContactIndex: -1
    },

    methods: {
        addContact: function () {
            var isCorrect = true;
            var nameInput = document.getElementById("name-input");
            var nameError = document.getElementById("name-error-message");
            var lastNameInput = document.getElementById("last-name-input");
            var lastNameError = document.getElementById("last-name-error-message");
            var phoneNumberInput = document.getElementById("phone-number-input");
            var phoneNumberError = document.getElementById("phone-error-message");

            if (this.name === "") {
                isCorrect = false;
                nameInput.classList.add("invalid");
                nameError.style.display = "block";
            } else {
                nameInput.classList.remove("invalid");
                nameError.style.display = "none";
            }

            if (this.lastName === "") {
                isCorrect = false;
                lastNameInput.classList.add("invalid");
                lastNameError.style.display = "block";
            } else {
                lastNameInput.classList.remove("invalid");
                lastNameError.style.display = "none";
            }

            var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            var isValid = regex.test(this.phone);

            var isContainPhone = false;

            this.contacts.forEach(function (contact) {
                if (contact.phone === phoneNumberInput.value) {
                    isContainPhone = true;
                }
            });

            if (this.phone === "" || !isValid) {
                phoneNumberInput.classList.add("invalid");
                phoneNumberError.style.display = "block";
                isCorrect = false;
            } else if (isContainPhone) {
                phoneNumberError.textContent = "Контакт с таким номером уже существует";
                phoneNumberInput.classList.add("invalid");
                phoneNumberError.style.display = "block";
                isCorrect = false;
            } else {
                phoneNumberInput.classList.remove("invalid");
                phoneNumberError.style.display = "none";
                phoneNumberInput.textContent = "Номер введен некорректно, введите в формате: +79123456789";
            }

            if (!isCorrect) {
                return;
            }

            this.contacts.push({
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                id: this.id,
            });

            this.id++;
            this.name = "";
            this.lastName = "";
            this.phone = "";
            isContainPhone = false;
        },

        deleteContact: function () {
            this.contacts.splice(this.deletableContactIndex, 1);
        },

        putToDeleteContactIndex: function (index) {
            this.deletableContactIndex = index;
        }
    }
});