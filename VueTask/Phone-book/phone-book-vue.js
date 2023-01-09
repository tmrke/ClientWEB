new Vue({
    el: "#app",

    data: {
        contacts: [],
        contactId: 1,
        name: "",
        lastName: "",
        phone: ""
    },

    methods: {
        addContact: function () {
            var isCorrect = true;
            var errorInputs = []

            if (this.name === "") {
                isCorrect = false;
            } else {
                errorInputs.push($("#name-input"))
            }

            if (this.lastName === "") {
                isCorrect = false;
            } else {
                errorInputs.push($("#last-name-input"))
            }

            var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            var isValid = regex.test(this.phone);

            if (this.phone === "" || !isValid) {
                errorInputs.push($("#phone-number-input"))
                isCorrect = false;
            } else if (this.contacts.phone.indexOf(this.phone) !== -1) {
                $("#phone-number-input").text("Контакт с таким номером уже существует");
                isCorrect = false;
            } else {
                $("#phone-number-input").text("Номер введен некорректно, введите в формате: +79234567890");
            }

            if (!isCorrect) {
                this.showError(errorInputs);
            } else {
                this.contacts.push({
                    name: this.name,
                    lastName: this.lastName,
                    phone: this.phone,
                    id: this.contactId,
                });

                this.updatePositionContact();
                this.contactId++;
                this.name = "";
                this.lastName = "";
                this.phone = "";
            }
        },

        showError: function (inputs) {
            inputs.forEach(function (input) {
                input.addClass("invalid");
            });
        },

        deleteContact: function (contactId) {
            this.contacts.splice(contactId, 1);
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