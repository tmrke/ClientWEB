new Vue({
    el: "#app",

    data: {
        contacts: [],
        contactId: 1,
        positionContact: 1,
        name: "",
        lastName: "",
        phone: ""
    },

    methods: {
        addContact: function () {
            this.contacts.push({
                name: this.name,
                lastName: this.lastName,
                phone: this.phone,
                id: this.contactId
            });

            this.contactId++;
            this.name = "";
            this.lastName = "";
            this.phone = "";
        },

        deleteContact: function (contactId){

            this.contacts.splice(contactId, 1);
        },

        getPositionContact: {
        }
    }
});