new Vue({
    el: "#app",

    data: {
        items: [],
        newItemText: "",
        itemId: 1,
        isNewItemInvalid: false
    },

    methods: {
        addItem: function () {
            var errorMessage = $("#error-message")
            this.isNewItemInvalid = this.newItemText.length === 0;

            if (this.isNewItemInvalid) {
                errorMessage.removeClass("d-none");

                return;
            }

            errorMessage.addClass("d-none");

            this.items.push({
                id: this.itemId,
                text: this.newItemText,
                isEditMode: false,
                editText: ""
            });

            this.itemId++;
            this.newItemText = "";
        },

        deleteItem: function (itemIndex) {
            this.items.splice(itemIndex, 1);
        },

        editItem: function (item) {
            item.editText = item.text;
            item.isEditMode = true;
        },

        saveChange: function (item) {
            if (item.editText.length === 0) {
                return;
            }

            item.text = item.editText;
            item.isEditMode = false;
        },

        cancelChange: function (item) {
            item.isEditMode = false;
        }
    }
});