new Vue({
    el: "#app",

    data: {
        contacts: [],
        id: 1,
        name: "",
        lastName: "",
        phone: "",
        deletableContactIndex: -1,
        isNameInvalid: false,
        isLastNameInvalid: false,
        isPhoneNumberInvalid: false,
        isContainPhone: false
    },

    methods: {
        addContact: function () {
            var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            var isValid = regex.test(this.phone);
            this.isContainPhone = false;
            this.isContainPhone = false;

            this.isNameInvalid = this.name === "";
            this.isLastNameInvalid = this.lastName === "";
            this.isPhoneNumberInvalid = this.isPhoneNumberInvalid === "" || !isValid;

            var self = this;

            this.contacts.forEach(function (contact) {
                if (contact.phone === self.phone) {
                    self.isContainPhone = true;
                }
            });

            if (this.isNameInvalid || this.isLastNameInvalid || this.isPhoneNumberInvalid || this.isContainPhone) {
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
            this.isContainPhone = false;
        },

        deleteContact: function () {
            this.contacts.splice(this.deletableContactIndex, 1);
        },

        setDeletableContactIndex: function (index) {
            this.deletableContactIndex = index;
        }
    }
});