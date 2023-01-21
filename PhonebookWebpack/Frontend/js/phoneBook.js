import "bootstrap/dist/css/bootstrap.css";
import "../css/phoneBook.scss";

import "bootstrap/dist/js/bootstrap.bundle";
import Vue from "vue";

import phoneBook from "./phoneBook.vue";

new Vue({
    render(h) {
        return h(phoneBook);
    }
}).$mount("#app");