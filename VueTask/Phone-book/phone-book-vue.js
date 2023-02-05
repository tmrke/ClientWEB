new Vue({
    el: "#app",

    data: {
        nextContactId: 1,
        contacts: [],
        name: "",
        lastName: "",
        phone: "",
        deletableContactIndex: null,
        isNameInvalid: false,
        isLastNameInvalid: false,
        isPhoneNumberInvalid: false,
        containsPhone: false,
        regex: /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    },

    methods: {
        addContact: function () {
            var isValid = this.regex.test(this.phone);
            this.containsPhone = false;
            this.isNameInvalid = this.name === "";
            this.isLastNameInvalid = this.lastName === "";
            this.isPhoneNumberInvalid = this.isPhoneNumberInvalid === "" || !isValid;

            var self = this;

            this.contacts.forEach(function (contact) {
                if (contact.phone === self.phone) {
                    self.containsPhone = true;
                }
            });

            if (this.isNameInvalid || this.isLastNameInvalid || this.isPhoneNumberInvalid || self.containsPhone) {
                return;
            }

            this.contacts.push({
                id: this.nextContactId,
                name: this.name,
                lastName: this.lastName,
                phone: this.phone
            });

            this.nextContactId++;
            this.name = "";
            this.lastName = "";
            this.phone = "";
            this.containsPhone = false;
        },

        deleteContact: function () {
            this.contacts.splice(this.deletableContactIndex, 1);
        },

        setDeletableContactIndex: function (index) {
            this.deletableContactIndex = index;
        }
    }
});