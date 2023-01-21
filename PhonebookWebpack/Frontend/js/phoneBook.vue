<template>
  <div id="app" class="container" v-cloak>
    <form class="col-12 col-md-6 justify-content-center mx-auto" id="form" novalidate>
      <label class="m-4 justify-content-center row">Имя:
        <input v-model.trim="name"
               id="name-input"
               type="text"
               class="form-control"
               aria-describedby="name-error-message"
               required>
        <span class="error-message justify-content-center row invalid-feedback"
              id="name-error-message">Введите имя</span>
      </label>

      <label class="m-4 justify-content-center row">Фамилия:
        <input v-model.trim="lastName" id="last-name-input"
               type="text"
               class="form-control"
               aria-describedby="last-name-error-message"
               required>
        <span class="error-message justify-content-center row invalid-feedback"
              id="last-name-error-message">
                Введите фамилию
            </span>
      </label>

      <label class="m-4 justify-content-center row"> Номер телефона:
        <input v-model.trim="phone"
               id="phone-number-input"
               placeholder="+79234567890"
               class="form-control"
               required>
        <span class="error-message justify-content-center row invalid-feedback"
              id="phone-error-message">Введите номер в формате: +79123456789</span>
      </label>

      <label class="m-4 justify-content-center row">
        <input @click.prevent="addContact"
               type="submit"
               class="add-button btn btn-success"
               id="add-button"
               value="Добавить">
      </label>
    </form>
    <table class="contacts-table table mt-3 table-striped table-hover" id="contacts-table">
      <thead>
      <tr class="table-head">
        <th>№</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Номер телефона</th>
        <th></th>
      </tr>
      </thead>
      <tbody class="contacts-table table-dark" id="tbody">
      <tr v-for="(contact, index) in contacts" :key="contact.id">
        <td v-text="index+1"></td>
        <td v-text="contact.name"></td>
        <td v-text="contact.lastName"></td>
        <td v-text="contact.phone"></td>
        <td>
          <button @click="putToDeleteContact(contact)"
                  class="btn delete-button btn-danger w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#modal-dialog">
            Удалить
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="modal fade bg-opacity-25" id="modal-dialog" tabindex="-1" aria-labelledby="modal-dialog-label"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-dialog-label">Вы уверены?</h5>
          </div>
          <div class="modal-footer">
            <button @click="deleteContact"
                    class="btn bg-danger yes-button"
                    data-bs-dismiss="modal"
                    id="yes-button">
              Да
            </button>
            <button class="btn btn-success" data-bs-dismiss="modal" id="no-button">Нет</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";
import $ from "jquery";

import "bootstrap/dist/css/bootstrap.css";
import "../css/phoneBook.scss";

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
</script>

<style lang="scss">
$primary-color: #f00;

* {
  box-sizing: border-box;
}

.error-message {
  color: $primary-color;
}

.invalid {
  border-color: $primary-color;
}

.table-head {
  background: #3498db;
}


</style>