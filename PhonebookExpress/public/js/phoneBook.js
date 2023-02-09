function PhoneBookService() {
}

function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

PhoneBookService.prototype.url = "/api/";

PhoneBookService.prototype.getContacts = function (term) {
    return get(this.url + "getContacts", {term: term});
}

PhoneBookService.prototype.addContact = function (contact) {
    return post(this.url + "addContact", {contact: contact});
}

PhoneBookService.prototype.deleteContact = function (id) {
    return post(this.url + "deleteContact", {id: id});
}

new Vue({
    el: "#app",

    data: {
        nextContactId: 1,
        contacts: [],
        name: "",
        lastName: "",
        phone: "",

        deletableContactIndex: -1,
        isNameInvalid: false,
        isLastNameInvalid: false,
        isPhoneNumberInvalid: false,
        isSearchInvalid: false,
        containsPhone: false,
        regex: /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        term: "",
        service: new PhoneBookService()
    },

    created() {
        this.loadContacts();
    },

    methods: {
        loadContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Не удалось загрузить контакт");
            });
        },

        addContact: function () {
            var isValid = this.regex.test(this.phone);

            this.containsPhone = false;
            this.isNameInvalid = this.name === "";
            this.isLastNameInvalid = this.lastName === "";
            this.isPhoneNumberInvalid = this.isPhoneNumberInvalid === "" || !isValid;

            if (this.isNameInvalid || this.isLastNameInvalid || this.isPhoneNumberInvalid || this.containsPhone) {
                return;
            }

            var request = {
                id: this.nextContactId,
                name: this.name,
                lastName: this.lastName,
                phone: this.phone
            };

            var self = this;

            this.service.addContact(request).done(function (response) {
                if (response.message === "Контакт с таким номером телефона уже существует") {
                    self.containsPhone = true;

                    return;
                }

                self.loadContacts();

                self.nextContactId++;
                self.name = "";
                self.lastName = "";
                self.phone = "";
                self.containsPhone = false;
            }).fail(function () {
                alert("Не удалось добавить контакт");
            });
        },

        deleteContact: function () {
            var self = this;

            this.service.deleteContact(self.deletableContact.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);

                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Не удалось удалить контакт");
            });
        },

        searchContact: function () {
            if (this.term === "") {
                this.isSearchInvalid = true;

                return;
            }

            this.loadContacts();
        },

        cancelSearch: function () {
            this.isSearchInvalid = false;
            this.term = "";
            this.loadContacts();
        },

        setDeletableContact: function (contact) {
            this.deletableContact = contact;
        }
    }
});