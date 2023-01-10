new Vue({
    el: "#app",

    data: {
        contacts: [],
        contactId: 1,
        name: "",
        lastName: "",
        phone: "",
        phones: [],
        isContainPhone: function (phones, phone) {
            return phones.indexOf(phone, 0) !== -1;
        }
    },

    methods: {
        addContact: function () {
            var isCorrect = true;
            var nameInput = $("#name-input");
            var nameError = $("#name-error-message");
            var lastNameInput = $("#last-name-input");
            var lastNameError = $("#last-name-error-message");
            var phoneNumberInput = $("#phone-number-input");
            var phoneNumberError = $("#phone-error-message");

            if (this.name === "") {
                isCorrect = false;
                nameInput.addClass("invalid");
                nameError.show();
            } else {
                nameInput.removeClass("invalid");
                nameError.hide();
            }

            if (this.lastName === "") {
                isCorrect = false;
                lastNameInput.addClass("invalid");
                lastNameError.show();
            } else {
                lastNameInput.removeClass("invalid");
                lastNameError.hide();
            }

            var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            var isValid = regex.test(this.phone);

            if (this.phone === "" || !isValid) {
                phoneNumberInput.addClass("invalid");
                phoneNumberError.show();
                isCorrect = false;
            } else if (this.isContainPhone(this.phones, this.phone)) {
                phoneNumberError.text("Контакт с таким номером уже существует");
                phoneNumberInput.addClass("invalid");
                phoneNumberError.show();
                isCorrect = false;
            } else {
                phoneNumberInput.removeClass("invalid");
                phoneNumberError.hide();
                phoneNumberInput.text("Номер введен некорректно, введите в формате: +79123456789");
            }

            if (!isCorrect) {
                return;
            }

            this.contacts.push({
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                id: this.contactId,
            });

            this.phones.push(this.phone);
            this.updatePositionContact();
            this.contactId++;
            this.name = "";
            this.lastName = "";
            this.phone = "";
        },

        deleteContact: function (contactId, phone) {

            this.contacts.splice(contactId, 1);
            this.phones.splice(phone, 1);
            this.updatePositionContact();
        },

        updatePositionContact: function () {
            function updateTableNumeration() {
                $(".contacts-table tr").each(function (positionNumber) {
                    $(this).find("td:first").text(positionNumber);
                });
            }

            $.ajax({
                success: function () {
                    updateTableNumeration();
                }
            });
        }
    }
});