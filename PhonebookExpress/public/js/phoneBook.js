function phoneBookService() {
    this.url = "/api/";
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

phoneBookService.prototype.getContacts = function (term) {
    return get(this.url + "getContacts", {term: term});
}

phoneBookService.prototype.addContact = function (contact) {
    return post(this.url + "addContact", {contact: contact});
}

phoneBookService.prototype.deleteContact = function (id) {
    return post(this.url + "deleteContact", {id: id});
}

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
        isContainPhone: false,
        service: new phoneBookService()
    },

    methods: {
        loadContact: function () {
            var self = this;
            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Не удалось загрузить контакт");
            });
        },

        addContact: function () {
            var regex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            var isValid = regex.test(this.phone);

            this.isContainPhone = false;
            this.isNameInvalid = this.name === "";
            this.isLastNameInvalid = this.lastName === "";
            this.isPhoneNumberInvalid = this.isPhoneNumberInvalid === "" || !isValid;

            if (this.isNameInvalid || this.isLastNameInvalid || this.isPhoneNumberInvalid) {
                return;
            }

            var request = {
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                id: this.id
            }

            var self = this;

            this.service.addContact(request).done(function (response) {
                if (!response.success) {
                    self.isContainPhone = true;

                    return;
                }

                self.loadContact();

                self.id++;
                self.name = "";
                self.lastName = "";
                self.phone = "";
                self.isContainPhone = false;
            }).fail(function () {
                alert("Не удалось добавить контакт")
            });
        },

        deleteContact: function () {
            var self = this;

            this.service.deleteContact(self.deletableContact.id).done(function (response) {
                if (!response.success) {
                    alert(response.message);

                    return;
                }

                self.loadContact();
            }).fail(function () {
                alert("Не удалось удалить контакт");
            });
        },

        setDeletableContact: function (contact) {
            this.deletableContact = contact;
        }
    }
});