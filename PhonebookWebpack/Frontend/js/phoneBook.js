import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.css";
import "../css/phoneBook.css";

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
        term: "",
        deletableContact: null,
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
            } else {
                phoneNumberInput.removeClass("invalid");
                phoneNumberError.hide();
                phoneNumberInput.text("Номер введен некорректно, введите в формате: +79123456789");
            }

            if (!isCorrect) {
                return;
            }

            this.loadContact();
            var self = this;

            var request = {
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                id: this.id
            }

            this.service.addContact(request).done(function (response) {
                if (response.message === "Контакт с таким номером телефона уже есть") {
                    phoneNumberError.text("Контакт с таким номером уже существует");
                    phoneNumberInput.addClass("invalid");
                    phoneNumberError.show();

                    return;
                }

                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContact();

                self.id++;
                self.name = "";
                self.lastName = "";
                self.phone = "";
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

        putToDeleteContact: function (contact) {
            this.deletableContact = contact;
        }
    }
});